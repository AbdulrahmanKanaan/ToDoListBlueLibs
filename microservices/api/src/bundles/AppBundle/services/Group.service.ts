import { Service, EventManager, ContainerInstance } from "@bluelibs/core";
import { ObjectId, toModel } from "@bluelibs/ejson";
import { DocumentNotFoundException } from "@bluelibs/mongo-bundle";
import { ValidatorService } from "@bluelibs/validator-bundle";
import { Group, GroupsCollection } from "../collections";
import { ResolverArguments } from "../types";
import { GroupInsertInput, GroupUpdateInput } from "./inputs";
import { UserService } from ".";
import { GroupDeletedEvent } from "../events";

@Service()
export class GroupService {
  constructor(
    protected readonly container: ContainerInstance,
    protected readonly eventManager: EventManager,
    protected readonly groupsCollection: GroupsCollection,
    protected readonly usersService: UserService,
    protected readonly validatorService: ValidatorService
  ) {}

  public async findOne({ args, ast, carry }: ResolverArguments) {
    const query = this.extractQuery({ args, carry });
    const group = await this.groupsCollection.queryOneGraphQL(ast, query);
    if (!group) {
      throw new DocumentNotFoundException();
    }
    return group;
  }

  public async find({ args, ast, carry }: ResolverArguments) {
    const query = this.extractQuery({ args, carry });
    const userGroups = await this.groupsCollection.queryGraphQL(ast, query);
    return userGroups;
  }

  public async count({ args, carry }: ResolverArguments) {
    const query = this.extractQuery({ args, carry });
    const userGroups = await this.groupsCollection.count(query.filters, query.options);
    return userGroups;
  }

  public async insertOne({ args, userId, ast }: ResolverArguments) {
    const { document } = args;
    const model = toModel(GroupInsertInput, document);
    await this.validatorService.validate(model);
    const result = await this.groupsCollection.insertOne(model, {
      context: { userId },
    });
    const insertedId = result.insertedId;
    return await this.getGroupByResultId(insertedId, ast);
  }

  public async updateOne({ args, userId, ast }: ResolverArguments) {
    const { document, _id: groupId } = args;
    const model = toModel(GroupUpdateInput, document);
    await this.validatorService.validate(model);
    await this.groupsCollection.updateOne({ _id: groupId }, { $set: document }, { context: { userId } });
    return await this.getGroupByResultId(groupId, ast);
  }

  public async deleteOne({ args, userId }: ResolverArguments) {
    const { _id: groupId } = args;
    const result = await this.groupsCollection.deleteOne({ _id: groupId }, { context: { userId } });
    await this.eventManager.emit(new GroupDeletedEvent({ groupId, userId }));
    return result.acknowledged;
  }

  public async checkGroupExists({ args }: ResolverArguments<{ _id: ObjectId }>): Promise<void> {
    const { _id: groupId } = args;
    const isExists = !!(await this.groupsCollection.findOne({ _id: groupId }, { projection: { _id: 1 } }));
    if (!isExists) {
      throw new DocumentNotFoundException();
    }
  }

  private async getGroupByResultId(id: ObjectId, ast: any): Promise<Partial<Group>> {
    const group = await this.groupsCollection.queryOneGraphQL(ast, {
      filters: {
        _id: id,
      },
    });
    return group;
  }

  private extractQuery({ carry, args }) {
    const query = carry && "query" in carry ? carry.query : args;
    return query;
  }
}

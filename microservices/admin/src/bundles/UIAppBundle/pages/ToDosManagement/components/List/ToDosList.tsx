import {
  newSmart,
  useRouter,
  useUIComponents,
  useTranslate,
} from "@bluelibs/x-ui";
import { useEffect, useState, useMemo } from "react";
import { ToDosAntTableSmart } from "./ToDosTableSmart";
import { PlusOutlined, FilterOutlined } from "@ant-design/icons";
import * as Ant from "antd";
import { Routes } from "@bundles/UIAppBundle";
import { features } from "../../config/features";
import { ToDosListFilters } from "./ToDosListFilters";

export function ToDosList() {
  const UIComponents = useUIComponents();
  const router = useRouter();
  const t = useTranslate();
  const [api, Provider] = newSmart(ToDosAntTableSmart);
  const [filtersOpened, setFiltersOpened] = useState(false);
  const onFiltersUpdate = useMemo(() => {
    return (filters) => {
      api.setFlexibleFilters(filters);
    };
  }, []);

  return (
    <UIComponents.AdminLayout>
      <Ant.PageHeader
        title={t("management.to_dos.list.header")}
        extra={[
          features.create ? (
            <Ant.Button
              key="1"
              onClick={() => router.go(Routes.TO_DOS_CREATE)}
              icon={<PlusOutlined />}
            >
              {t("management.to_dos.list.create_btn")}
            </Ant.Button>
          ) : null,
          <Ant.Button
            key="2"
            onClick={() => setFiltersOpened(!filtersOpened)}
            icon={<FilterOutlined />}
          >
            {t("generics.list_filters")}
          </Ant.Button>,
        ]}
      />

      {api.state.isError && (
        <Ant.Alert type="error" message={t("generics.error_message")} />
      )}

      <Ant.Layout.Content>
        <Provider>
          <div className="page-to-dos-list">
            {filtersOpened && <ToDosListFilters onUpdate={onFiltersUpdate} />}
            <Ant.Input.Search
              name="Search"
              placeholder={t("generics.list_search")}
              className="search"
              onKeyUp={(e) => {
                const value = (e.target as HTMLInputElement).value;
                api.setFilters({
                  // Customise your search filters!
                  title: new RegExp(`${value}`, "i"),
                });
              }}
            />
            <Ant.Table {...api.getTableProps()} />
          </div>
        </Provider>
      </Ant.Layout.Content>
    </UIComponents.AdminLayout>
  );
}

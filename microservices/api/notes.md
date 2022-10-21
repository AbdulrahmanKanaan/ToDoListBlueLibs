# algorithm

## keywords

- (old) old position
- (new) new position
- (mf) old < new => item is moved forward
- (mb) old > new => item is moved backward

## steps

- if item is mf then we need to decrement all items gt(old) and lte(new)
- if item is mb then we need to increment all items gte(new) and lt(old)
- if eq(old, new) the do nothing ☺
- update the item position

test push

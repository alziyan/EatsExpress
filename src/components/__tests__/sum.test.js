import { sum } from "../sum";

test("SumTest", () => {
  const result = sum(3, 4);

  expect(result).toBe(7);
});

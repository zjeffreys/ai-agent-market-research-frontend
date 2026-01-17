export function createCostLogger(budget: number) {
  let spent = 0;
  let warned = false;

  return function log(tokens: number) {
    spent += tokens;
    const ratio = spent / budget;
    const percent = (ratio * 100).toFixed(1);

    if (!warned && ratio >= 0.8) {
      warned = true;
      console.warn(`Token spend at ${percent}% of budget (${spent}/${budget})`);
    } else {
      console.log(`Token spend: ${spent}/${budget} (${percent}%)`);
    }
  };
}

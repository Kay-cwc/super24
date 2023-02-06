
const sumArr = (nums: number[]) => {
    return nums.reduce((prev, current) => prev + current, 0);
}

const mulArr = (nums: number[]) => {
    return nums.reduce((prev, current) => prev * current, 1);
}

type TwoDArray = number[][];

type Computation = 'sum' | 'sub' | 'mul' | 'div';

type OutcomeOneside = Record<Computation, number | undefined>;

const getSliceIndices = (slice1: number[]): TwoDArray => {
    let x = 0;
    const slice2: number[] = []
    while (x < 4) {
        if (!slice1.includes(x)) {
            slice2.push(x);
        }
        x += 1;
    }

    return [slice1, slice2];
}

const createSlices = (nums: number[], slices: TwoDArray): TwoDArray => {
    return slices.map((slice) => {
        return slice.map((i) => nums[i])
    })
}

const getYieldOneSide = (slice: number[]) => {
    const outcome: OutcomeOneside = {
        sum: undefined,
        sub: undefined,
        div: undefined,
        mul: undefined,
    }
    const [a, b] = slice;
    outcome.sum = a + b;
    outcome.mul = a * b;
    const div = a > b ? a / b : b / a;
    if (div % 1 === 0) {
        outcome.div = div;
    }
    return outcome;
}

const tryCalculate = (slices: TwoDArray) => {
    const yield0 = getYieldOneSide(slices[0]);
    const yield1 = getYieldOneSide(slices[1]);
    let outcome;

    Object.entries(yield0).forEach(([c1, o1]) => {
        if (o1 === undefined) return;
        Object.entries(yield1).forEach(([c2, o2]) => {
            if (o2 === undefined) return;
            const _outcome = getYieldOneSide([o1, o2]);
            console.log(_outcome)
        })
    })

    // console.log(yield0, yield1);
}

function findAllCombination(nums: number[], _steps: string[][], _sourceIdx: Record<string, boolean>[], outputSteps: string[][], depth=4) {
    let ok = false;
    // const newNums: number[] = []
    for (let i = 0; i < nums.length; i++) {
        if (ok) break;
        for (let j = i + 1; j < nums.length; j++) {
            let sourceDuplicated = false;
            const sourceIdxI = _sourceIdx[i];
            for (const [key, value] of Object.entries(_sourceIdx[j])) {
                if (sourceIdxI[key] === true) {
                    sourceDuplicated = true;
                    break;
                }
            };
            if (sourceDuplicated === true) continue;

            // console.log(sourceIdxI,sourceIdxJ)
            // check if i and j share the same index
            const plu = nums[i] + nums[j];
            const sub = nums[i] - nums[j];
            const mul = nums[i] * nums[j];
            const div = nums[i] / nums[j];
            const newNums: number[] = [];
            const steps: string[][] = [];
            const sourceIdx: Record<string, boolean>[] = [];
            // keep all original index for tracking
            // plain number
            nums.forEach((n, _s) => {
                if (n != i && n != j) {
                    newNums.push(n);
                    steps.push(_steps[_s]);
                    sourceIdx.push(_sourceIdx[_s]);
                }
            })
            // products
            newNums.push(plu, sub);
            steps.push([..._steps[i], '+', ..._steps[j]]);
            sourceIdx.push({..._sourceIdx[i], ..._sourceIdx[j]})
            steps.push([..._steps[i], '-', ..._steps[j]]);
            sourceIdx.push({..._sourceIdx[i], ..._sourceIdx[j]})
            if (mul < 100) {
                newNums.push(mul);
                steps.push([..._steps[i], 'x', ..._steps[j]]);
                sourceIdx.push({..._sourceIdx[i], ..._sourceIdx[j]})
            }
            if (div % 1 === 0) {
                newNums.push(div);
                steps.push([..._steps[i], '/', ..._steps[j]]);
                sourceIdx.push({..._sourceIdx[i], ..._sourceIdx[j]})
            }
            // aggregate two of each value and 
            // console.log(depth,steps);
            // console.log(newNums)
            if (depth > 1) {
                findAllCombination(newNums, steps, sourceIdx, outputSteps, depth - 1);
            } else if (newNums.includes(24)) {
                const index = newNums.findIndex(v => v === 24);
                const step = steps[index];
                if (step.length === 7) {
                    outputSteps.push(step);
                    ok = true;
                    break
                }
            }
            
        }
        // break
    }

    return outputSteps;
}

export function findSolution(nums: number[]) {
    // const stepMap = new Map<string, >
    if (nums.length != 4) throw Error('invalid case');
    // check sum all
    // console.log(sumAll);
    // find any possible combination of 2-12, 3-8, 4-6
    console.time();
    const outputSteps: string[][] = [];
    findAllCombination(nums, nums.map(n => [n.toString()]), [{'0': true}, {'1': true}, {'2': true}, {'3': true}], outputSteps);
    console.timeEnd();

    return outputSteps[0];
}
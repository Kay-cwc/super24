import { genCardNumber } from "./genCardNumber";

/**
 * hook to return 4 cards
 */
export const genRound = (): number[] => {
    let idx = 0;
    const rounds: number[] = [];
    do {
        rounds.push(genCardNumber());
        idx += 1;
    } while (idx < 4);

    return rounds;
}

import { useCardNumber } from "./useCardNumber";

/**
 * hook to return 4 cards
 */
export const useRound = (): number[] => {
    let idx = 0;
    const rounds: number[] = [];
    do {
        rounds.push(useCardNumber());
        idx += 1;
    } while (idx < 4);

    return rounds;
}

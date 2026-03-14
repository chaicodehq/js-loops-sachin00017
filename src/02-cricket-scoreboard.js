/**
 * 🏏 Gully Cricket Scoreboard
 *
 * Mohalle ke bacche gully cricket khel rahe hain. Tu scorekeeper hai bhai!
 * Har ball ka outcome ek array mein diya gaya hai. Tujhe scoreboard banana hai.
 *
 * Ball outcomes:
 *   - 0 = dot ball (no run)
 *   - 1 to 6 = runs scored on that ball
 *   - -1 = WICKET! Batsman out ho gaya
 *
 * Rules:
 *   - Loop through each ball in the array using a for loop
 *   - Track: totalRuns, totalBalls (all balls including wickets),
 *     wickets, fours (ball === 4), sixes (ball === 6)
 *   - IMPORTANT: Agar 10 wickets ho gaye, toh STOP! (use break)
 *     Innings khatam. Remaining balls are not counted.
 *
 * Validation:
 *   - Agar balls ek array nahi hai ya empty array hai,
 *     return karo: { totalRuns: 0, totalBalls: 0, wickets: 0, fours: 0, sixes: 0 }
 *
 * @param {number[]} balls - Array of ball outcomes
 * @returns {{ totalRuns: number, totalBalls: number, wickets: number, fours: number, sixes: number }}
 *
 * @example
 *   cricketScoreboard([4, 0, 6, -1, 2, 1])
 *   // => { totalRuns: 13, totalBalls: 6, wickets: 1, fours: 1, sixes: 1 }
 *
 *   cricketScoreboard([])
 *   // => { totalRuns: 0, totalBalls: 0, wickets: 0, fours: 0, sixes: 0 }
 */
export function cricketScoreboard(balls) {
  if (!Array.isArray(balls) || balls.length == 0) {
    return { totalRuns: 0, totalBalls: 0, wickets: 0, fours: 0, sixes: 0 };
  }
  let scoreCounter = 0;
  let wicketsCounter = 0;
  let foursCounter = 0;
  let sixesCounter = 0;
  let ballsCounter = 0;

  for (let i = 0; i < balls.length; i++) {
    ballsCounter++;
    if (balls[i] === -1) {
      wicketsCounter++;
      if (wicketsCounter == 10) break;
    } else {
      scoreCounter += balls[i];
    }

    if (balls[i] === 6) {
      sixesCounter++;
    } else if (balls[i] === 4) {
      foursCounter++
    }

  }

  return { totalRuns: scoreCounter, totalBalls: ballsCounter, wickets: wicketsCounter, fours: foursCounter, sixes: sixesCounter }

}

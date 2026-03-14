/**
 * 🏆 IPL Season Points Table
 *
 * IPL ka season chal raha hai aur tujhe points table banana hai!
 * Tujhe match results ka array milega, aur tujhe har team ke points
 * calculate karke sorted table return karna hai.
 *
 * Match result types:
 *   - "win": Winning team gets 2 points, losing team gets 0
 *   - "tie": Both teams get 1 point each
 *   - "no_result": Both teams get 1 point each (rain/bad light)
 *
 * Each match object: { team1: "CSK", team2: "MI", result: "win", winner: "CSK" }
 *   - For "tie" and "no_result", the winner field is absent or ignored
 *
 * Rules (use for loop with object accumulator):
 *   - Loop through matches array
 *   - Build an object accumulator: { "CSK": { team, played, won, lost, tied, noResult, points }, ... }
 *   - After processing all matches, convert to array and sort:
 *     1. By points DESCENDING
 *     2. If points are equal, by team name ASCENDING (alphabetical)
 *
 * Validation:
 *   - Agar matches array nahi hai ya empty hai, return []
 *
 * @param {Array<{team1: string, team2: string, result: string, winner?: string}>} matches
 * @returns {Array<{team: string, played: number, won: number, lost: number, tied: number, noResult: number, points: number}>}
 *
 * @example
 *   iplPointsTable([
 *     { team1: "CSK", team2: "MI", result: "win", winner: "CSK" },
 *     { team1: "RCB", team2: "CSK", result: "tie" },
 *   ])
 *   // CSK: played=2, won=1, tied=1, points=3
 *   // MI: played=1, won=0, lost=1, points=0
 *   // RCB: played=1, tied=1, points=1
 *   // Sorted: CSK(3), RCB(1), MI(0)
 */
export function iplPointsTable(matches) {
  // 1. Validation: If no matches, return empty array
  if (!Array.isArray(matches) || matches.length <= 0) {
    return [];
  }

  let table = {};

  for (let match of matches) {

    if (!table.hasOwnProperty(match.team1)) {
      table[match.team1] = {
        team: match.team1, played: 0, won: 0, lost: 0, tied: 0, noResult: 0, points: 0
      };
    }

    if (!table.hasOwnProperty(match.team2)) {
      table[match.team2] = {
        team: match.team2, played: 0, won: 0, lost: 0, tied: 0, noResult: 0, points: 0
      };
    }

    // Both teams played this match
    table[match.team1].played++;
    table[match.team2].played++;

    // 3. Scoring Logic
    if (match.result === 'win') {
      let winner = match.winner;
      let loser = (winner === match.team1) ? match.team2 : match.team1;

      // Update Winner
      table[winner].won++;
      table[winner].points += 2;

      // Update Loser
      table[loser].lost++;
    }
    else if (match.result === 'tie' || match.result === 'no_result') {
      // Both teams get 1 point
      table[match.team1].points += 1;
      table[match.team2].points += 1;

      if (match.result === 'tie') {
        table[match.team1].tied++;
        table[match.team2].tied++;
      } else {
        table[match.team1].noResult++;
        table[match.team2].noResult++;
      }
    }
  }

  // 4. Convert the Object to an Array
  const finalTable = Object.values(table);

  // 5. Sort the Table
  finalTable.sort((a, b) => {
    // Rule 1: Points Descending (High to Low)
    if (b.points !== a.points) {
      return b.points - a.points;
    }
    // Rule 2: Name Ascending (Alphabetical)
    return a.team.localeCompare(b.team);
  });

  return finalTable;
}


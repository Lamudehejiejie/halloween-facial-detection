import * as faceapi from "face-api.js";

export class ExpressionAnalyzer {
  private currentScore: number = 0;
  private readonly SMOOTHING_FACTOR = 0.15;
  private readonly SMILE_INCREASE_RATE = 3;
  private readonly DECAY_RATE = 2.5; // 5x faster decay

  analyzeExpression(expressions: faceapi.FaceExpressions): number {
    const happy = expressions.happy;

    // Always decay the score over time (unless smiling)
    let targetScore = this.currentScore - this.DECAY_RATE;

    // Smile increases score significantly
    if (happy > 0.3) {
      // The more you smile, the faster it increases
      targetScore = this.currentScore + (happy * this.SMILE_INCREASE_RATE);
    }

    // Clamp between 0 and 100
    targetScore = Math.max(0, Math.min(100, targetScore));

    // Smooth transition
    this.currentScore =
      this.currentScore * (1 - this.SMOOTHING_FACTOR) +
      targetScore * this.SMOOTHING_FACTOR;

    return Math.round(this.currentScore);
  }

  reset(): void {
    this.currentScore = 0;
  }

  getCurrentScore(): number {
    return Math.round(this.currentScore);
  }
}

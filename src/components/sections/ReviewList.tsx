import { reviews } from "@/content/reviews";
import { ReviewCard } from "@/components/sections/ReviewCard";

export function ReviewList() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
}

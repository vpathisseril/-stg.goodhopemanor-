import type { Review } from "@/types/content";
import { Card } from "@/components/ui/Card";

type ReviewCardProps = {
  review: Review;
};

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <Card>
      <figure>
        <blockquote className="font-heading text-xl leading-relaxed text-typography-primary">
          “{review.text}”
        </blockquote>
        <figcaption className="mt-5 text-base font-semibold text-typography-muted">
          {review.source},{" "}
          <time dateTime={review.dateTime}>{review.dateLabel}</time>
        </figcaption>
      </figure>
    </Card>
  );
}

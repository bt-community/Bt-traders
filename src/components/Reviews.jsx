import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Star,
  Quote,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const API_BASE = "https://bt-community-production.up.railway.app/api/v1";



const getAuthHeader = () => {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const Reviews = () => {
  const { toast } = useToast();
  const reviewsSectionRef = useRef(null);

  const [liveReviews, setLiveReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({ rating: 5, message: "" });

  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage, setReviewsPerPage] = useState(6);

  /* ----------------------------------
     RESPONSIVE REVIEWS PER PAGE
  ---------------------------------- */
  useEffect(() => {
    const updateReviewsPerPage = () => {
      const width = window.innerWidth;

      if (width < 1024) {
        setReviewsPerPage(3); // mobile + tablet
      } else {
        setReviewsPerPage(6); // desktop
      }

      setCurrentPage(1); // reset page on resize
    };

    updateReviewsPerPage();
    window.addEventListener("resize", updateReviewsPerPage);

    return () => window.removeEventListener("resize", updateReviewsPerPage);
  }, []);

  /* ----------------------------------
     FETCH REVIEWS
  ---------------------------------- */
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${API_BASE}/api/v1/reviews`);
      if (res.ok) {
        const data = await res.json();
        setLiveReviews(data.reverse());
      }
    } catch (err) {
      console.error("Failed to load reviews");
    } finally {
      setIsLoading(false);
    }
  };

  /* ----------------------------------
     SUBMIT REVIEW
  ---------------------------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!localStorage.getItem("token")) {
      toast({
        title: "Login Required",
        description: "Please sign in to submit a review.",
        variant: "destructive",
      });
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/v1/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader(),
        },
        body: JSON.stringify({
          rating: formData.rating,
          massage: formData.message,
        }),
      });

      if (res.ok) {
        toast({ title: "Review submitted successfully!" });
        setFormData({ rating: 5, message: "" });
        fetchReviews();
      }
    } catch {
      toast({
        title: "Server Error",
        variant: "destructive",
      });
    }
  };

  /* ----------------------------------
     PAGINATION LOGIC
  ---------------------------------- */
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = liveReviews.slice(
    indexOfFirstReview,
    indexOfLastReview
  );
  const totalPages = Math.ceil(liveReviews.length / reviewsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    reviewsSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={reviewsSectionRef}
      id="reviews"
      className="py-16 md:py-24 relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_hsl(145_80%_42%_/_0.05)_0%,_transparent_70%)]"
      />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-5">
            <Star className="w-4 h-4 text-primary fill-primary" />
            <span className="text-sm font-medium text-primary">
              Live Testimonials
            </span>
          </div>

          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold">
            What Our <span className="text-gradient-primary">Traders Say</span>
          </h2>
        </div>

        {/* Reviews Grid */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-8 min-h-[420px]">
          {isLoading ? (
            <div className="col-span-full flex justify-center py-12">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
          ) : currentReviews.length ? (
            currentReviews.map((review, index) => (
              <div
                key={review.id || index}
                className="glass-card p-6 rounded-2xl border border-primary/20 flex flex-col justify-between min-h-[240px] transition-transform hover:scale-[1.02]"
              >
                <div>
                  <Quote className="w-7 h-7 text-primary/30 mb-4" />
                  <p className="text-sm italic text-muted-foreground line-clamp-4 leading-relaxed">
                    "{review.massage}"
                  </p>
                </div>

                <div className="flex items-center gap-4 border-t border-white/5 pt-4 mt-6">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                    {review.userName
                      ? review.userName.slice(0, 2).toUpperCase()
                      : "TR"}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold truncate">
                      {review.userName || "Verified Trader"}
                    </p>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < review.rating
                              ? "text-yellow-500 fill-yellow-500"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-muted-foreground">
              No reviews available yet.
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col items-center gap-4 mb-16">
            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="ghost"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>

              {[...Array(totalPages)].map((_, i) => (
                <Button
                  key={i}
                  size="sm"
                  variant={currentPage === i + 1 ? "default" : "ghost"}
                  onClick={() => handlePageChange(i + 1)}
                  className="w-9 h-9 p-0"
                >
                  {i + 1}
                </Button>
              ))}

              <Button
                size="icon"
                variant="ghost"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>

            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              Page {currentPage} of {totalPages}
            </p>
          </div>
        )}

        {/* Review Form */}
        <div className="max-w-xl mx-auto">
          <div className="glass-card p-8 rounded-2xl">
            <h3 className="font-display font-semibold text-xl mb-6 text-center">
              Share Your Experience
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm mb-2 text-muted-foreground">
                  Rate us
                </label>
                <div className="flex gap-2 mb-4 justify-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() =>
                        setFormData({ ...formData, rating: star })
                      }
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= formData.rating
                            ? "text-yellow-500 fill-yellow-500"
                            : "text-muted-foreground"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <Textarea
                placeholder="Write your feedback..."
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                rows={4}
                required
              />

              <Button type="submit" variant="accent" className="w-full h-12">
                Submit Review
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;

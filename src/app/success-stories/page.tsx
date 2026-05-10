import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function SuccessStoriesPage() {
  const stories = [
    {
      id: 1,
      names: "Ananya & Rahul",
      location: "Mumbai, Maharashtra",
      quote: "We were busy with work — Eternity helped us meet with clarity, not chaos.",
      story: "Rahul and I were both focused on our careers and didn't have time for endless scrolling. Eternity matched us on values, long-term goals, and lifestyle fit. The first call felt effortless, and by the third week we were already planning how to introduce our families. We celebrated our wedding in a warm, intimate ceremony with close friends and family.",
      date: "Married in February 2025",
    },
    {
      id: 2,
      names: "Priya & Vikram",
      location: "Bangalore, Karnataka",
      quote: "Privacy aur verification — dono ne trust build kiya from day one.",
      story: "Main doctor hoon, schedule full-on crazy. Vikram architect hai — uske bhi late nights. Eternity ne humein match kiya because our pace of life and priorities aligned. Chat pe we kept it simple, then coffee, then family meet. Aaj bhi we cheer for each other’s goals — exactly what we wanted in a partner.",
      date: "Married in April 2025",
    },
    {
      id: 3,
      names: "Neha & Aditya",
      location: "Delhi, NCR",
      quote: "It wasn’t about perfect biodata — it was about a perfect partnership.",
      story: "We both wanted a relationship built on respect, equality, and real compatibility. Eternity’s matching felt thoughtful — not random. We bonded over music, books, and the kind of life we want to build together. By the time our families met, we already knew: this is it. Our wedding was small, peaceful, and full of laughter.",
      date: "Married in June 2025",
    },
    {
      id: 4,
      names: "Shruti & Karthik",
      location: "Chennai, Tamil Nadu",
      quote: "Finally, a platform jahan quality matches milte hain — time waste nahi hota.",
      story: "Main two years se different platforms try kar rahi thi, but it always felt superficial. Eternity pe profiles verified the, and the questions actually captured personality. Karthik se conversation straight meaningful thi — no awkward small talk. Third date tak we were talking about family, finances, and future plans. It felt right, naturally.",
      date: "Married in August 2025",
    },
    {
      id: 5,
      names: "Riya & Siddharth",
      location: "Pune, Maharashtra",
      quote: "Different cultures, same values — Eternity made it simple.",
      story: "Siddharth and I come from different cultural backgrounds, and usually that makes matchmaking complicated. But Eternity connected us on the things that matter long-term: values, communication style, and family expectations. Jab families ne dekha we’re genuinely happy and aligned, everything else became easy. Our wedding was a beautiful blend of both traditions.",
      date: "Married in November 2025",
    }
  ];

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <div className="flex-1 container mx-auto px-4 md:px-6 py-24 md:py-32">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-foreground">Success Stories</h1>
          <p className="text-xl text-muted-foreground">
            Thousands have found their forever on Eternity. Read the heartwarming stories of couples who began their beautiful journey with us.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          {stories.map((story) => (
            <div key={story.id} className="bg-card border border-border p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-24 h-24 bg-primary/10 rounded-full shrink-0 flex items-center justify-center text-primary text-3xl font-bold font-serif mb-4 md:mb-0">
                  {story.names.charAt(0)}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">{story.names}</h3>
                  <p className="text-sm font-medium text-primary mb-4">{story.location} • {story.date}</p>
                  <blockquote className="text-lg italic text-foreground/90 border-l-4 border-primary pl-4 mb-4">
                    &quot;{story.quote}&quot;
                  </blockquote>
                  <p className="text-muted-foreground leading-relaxed">
                    {story.story}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
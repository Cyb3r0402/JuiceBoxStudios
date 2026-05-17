import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Gamepad2, Ghost, Zap, Mail } from "lucide-react";
import logoPath from "@assets/juice-box-logo.png";
import heroBg from "@/assets/images/hero-bg.png";
import game1 from "@/assets/images/game-1.png";
import game2 from "@/assets/images/game-2.png";
import game3 from "@/assets/images/game-3.png";
import studioBg from "@/assets/images/studio.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground overflow-hidden font-sans relative">
      <div className="scanline" />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-3">
          <img src={logoPath} alt="Juice Box Studios" className="h-10 w-auto" />
          <span className="font-bold text-xl tracking-tighter hidden sm:inline-block">JUICE BOX STUDIOS</span>
        </div>
        <div className="flex items-center gap-6 font-mono text-sm uppercase tracking-wider">
          <a href="#manifesto" className="hover:text-primary transition-colors">Manifesto</a>
          <a href="#games" className="hover:text-secondary transition-colors">Games</a>
          <a href="#studio" className="hover:text-accent transition-colors">Studio</a>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold border-none rounded-none uppercase">
            Join Beta
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center pt-20">
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-background/60 z-10" />
          <img src={heroBg} alt="Hero Background" className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-20" />
        </motion.div>
        
        <div className="relative z-30 container mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl mx-auto flex flex-col items-center gap-8"
          >
            <motion.div variants={fadeUp} className="inline-block px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-primary font-mono text-sm font-bold uppercase tracking-widest box-glow">
              Player One Ready
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-6xl md:text-8xl lg:text-9xl font-black leading-none tracking-tighter text-glow">
              WE MAKE GAMES THAT MAKE YOU <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">FEEL SOMETHING.</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl md:text-2xl text-muted-foreground font-mono max-w-2xl leading-relaxed">
              Grown on juice boxes, fueled by late nights. We build kinetic, unapologetic indie experiences for the real ones.
            </motion.p>
            <motion.div variants={fadeUp} className="flex gap-4 mt-8">
              <Button size="lg" className="bg-primary text-white hover:bg-primary/80 h-14 px-8 text-lg font-bold rounded-none uppercase tracking-wider box-glow">
                Explore Our Worlds
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/5 h-14 px-8 text-lg font-bold rounded-none uppercase tracking-wider">
                Watch Reel
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Manifesto Section */}
      <section id="manifesto" className="py-32 relative">
        <div className="absolute inset-0 grid-bg opacity-30 z-0" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
          >
            <motion.div variants={fadeUp} className="p-8 border border-white/5 bg-card/50 backdrop-blur-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/40 transition-colors" />
              <Zap className="w-12 h-12 text-primary mb-6" />
              <h3 className="text-2xl font-bold mb-4">RAW ENERGY</h3>
              <p className="text-muted-foreground font-mono">We don't do boring. Every frame, every sound, every mechanic is designed to hit you like a shot of adrenaline.</p>
            </motion.div>
            <motion.div variants={fadeUp} className="p-8 border border-white/5 bg-card/50 backdrop-blur-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/20 rounded-full blur-3xl group-hover:bg-secondary/40 transition-colors" />
              <Gamepad2 className="w-12 h-12 text-secondary mb-6" />
              <h3 className="text-2xl font-bold mb-4">TIGHT CONTROLS</h3>
              <p className="text-muted-foreground font-mono">If it doesn't feel perfect in the first 5 seconds, we scrap it. Gameplay is king, and input is sacred.</p>
            </motion.div>
            <motion.div variants={fadeUp} className="p-8 border border-white/5 bg-card/50 backdrop-blur-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl group-hover:bg-accent/40 transition-colors" />
              <Ghost className="w-12 h-12 text-accent mb-6" />
              <h3 className="text-2xl font-bold mb-4">NOSTALGIA + NEXT-GEN</h3>
              <p className="text-muted-foreground font-mono">We take the magic of the arcade era and inject it with modern tech, lighting, and storytelling.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Games Section */}
      <section id="games" className="py-32 relative bg-black/50">
        <div className="container mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-20 text-center"
          >
            <h2 className="text-5xl md:text-7xl font-black mb-6 uppercase tracking-tighter">Current Roster</h2>
            <p className="text-xl text-muted-foreground font-mono max-w-2xl mx-auto">Three distinct worlds. Three unique obsessions.</p>
          </motion.div>

          <div className="space-y-32">
            {/* Game 1 */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              <motion.div variants={fadeUp} className="relative group">
                <div className="absolute -inset-4 bg-primary/20 blur-2xl group-hover:bg-primary/30 transition-colors rounded-[2rem]" />
                <img src={game1} alt="Neon Drift" className="relative rounded-lg border border-white/10 shadow-2xl z-10 w-full object-cover aspect-video" />
              </motion.div>
              <motion.div variants={fadeUp} className="flex flex-col gap-6 lg:pl-12">
                <div className="font-mono text-primary font-bold tracking-widest uppercase">Available Now</div>
                <h3 className="text-5xl font-black text-glow">NEON DRIFT</h3>
                <p className="text-lg text-muted-foreground font-mono leading-relaxed">
                  A high-speed, neon-drenched street racer where your style matters as much as your speed. Drift through a retro-futuristic metropolis, outrun the syndicates, and leave a trail of light.
                </p>
                <div className="flex gap-4">
                  <Button className="bg-white text-black hover:bg-gray-200 rounded-none font-bold px-8 h-12 uppercase">Play Now</Button>
                </div>
              </motion.div>
            </motion.div>

            {/* Game 2 */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              <motion.div variants={fadeUp} className="flex flex-col gap-6 lg:pr-12 order-2 lg:order-1">
                <div className="font-mono text-secondary font-bold tracking-widest uppercase">Early Access</div>
                <h3 className="text-5xl font-black text-glow-cyan">CHROMA KNIGHT</h3>
                <p className="text-lg text-muted-foreground font-mono leading-relaxed">
                  Slash your way through a dying magical forest. Absorb colors from enemies to switch stances, solve environmental puzzles, and defeat towering screen-filling bosses in this punishing 2D action-platformer.
                </p>
                <div className="flex gap-4">
                  <Button className="bg-secondary text-black hover:bg-secondary/80 rounded-none font-bold px-8 h-12 uppercase box-glow-cyan">Wishlist on Steam</Button>
                </div>
              </motion.div>
              <motion.div variants={fadeUp} className="relative group order-1 lg:order-2">
                <div className="absolute -inset-4 bg-secondary/20 blur-2xl group-hover:bg-secondary/30 transition-colors rounded-[2rem]" />
                <img src={game2} alt="Chroma Knight" className="relative rounded-lg border border-white/10 shadow-2xl z-10 w-full object-cover aspect-video" />
              </motion.div>
            </motion.div>

            {/* Game 3 */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              <motion.div variants={fadeUp} className="relative group">
                <div className="absolute -inset-4 bg-accent/20 blur-2xl group-hover:bg-accent/30 transition-colors rounded-[2rem]" />
                <img src={game3} alt="Midnight Protocol" className="relative rounded-lg border border-white/10 shadow-2xl z-10 w-full object-cover aspect-video" />
              </motion.div>
              <motion.div variants={fadeUp} className="flex flex-col gap-6 lg:pl-12">
                <div className="font-mono text-accent font-bold tracking-widest uppercase">In Development</div>
                <h3 className="text-5xl font-black" style={{ textShadow: "0 0 20px hsl(var(--accent)/0.5)" }}>MIDNIGHT PROTOCOL</h3>
                <p className="text-lg text-muted-foreground font-mono leading-relaxed">
                  Tactical isometric stealth. Infiltrate mega-corp facilities, hack mainframes in real-time, and get out before the alarms trigger. One mistake, and the whole run is burned.
                </p>
                <div className="flex gap-4">
                  <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-black rounded-none font-bold px-8 h-12 uppercase transition-all">Join Discord</Button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Studio / Vibe Section */}
      <section id="studio" className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={studioBg} alt="The Studio" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <motion.h2 variants={fadeUp} className="text-5xl md:text-7xl font-black mb-8">INSIDE THE BOX</motion.h2>
            <motion.p variants={fadeUp} className="text-xl text-muted-foreground font-mono leading-relaxed mb-12">
              We are a collective of developers, artists, and musicians who spent too much time in arcades and not enough time doing homework. We don't believe in focus groups. We believe in making things that look cool, play fast, and hit hard.
            </motion.p>
            
            <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-b border-white/10 py-12">
              <div>
                <div className="text-4xl font-black text-primary mb-2">3</div>
                <div className="font-mono text-sm text-muted-foreground uppercase">Original IPs</div>
              </div>
              <div>
                <div className="text-4xl font-black text-secondary mb-2">12</div>
                <div className="font-mono text-sm text-muted-foreground uppercase">Team Members</div>
              </div>
              <div>
                <div className="text-4xl font-black text-accent mb-2">0</div>
                <div className="font-mono text-sm text-muted-foreground uppercase">Microtransactions</div>
              </div>
              <div>
                <div className="text-4xl font-black text-white mb-2">100%</div>
                <div className="font-mono text-sm text-muted-foreground uppercase">Indie Spirit</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA / Newsletter */}
      <section className="py-32 bg-primary/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="max-w-2xl mx-auto text-center"
          >
            <Mail className="w-16 h-16 text-primary mx-auto mb-8" />
            <h2 className="text-4xl md:text-5xl font-black mb-6 uppercase">Don't Miss a Drop</h2>
            <p className="text-lg text-muted-foreground font-mono mb-8">
              Join the Juice Box mailing list. No spam. Just game announcements, beta access keys, and behind-the-scenes dev logs.
            </p>
            <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
              <Input 
                type="email" 
                placeholder="ENTER YOUR EMAIL" 
                className="h-14 bg-black/50 border-white/20 font-mono text-lg rounded-none focus-visible:ring-primary"
              />
              <Button type="submit" className="h-14 px-8 bg-primary text-white font-bold text-lg rounded-none uppercase hover:bg-primary/80 shrink-0">
                Subscribe <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <img src={logoPath} alt="Juice Box Studios" className="h-8 w-auto grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all" />
              <span className="font-bold tracking-tighter text-muted-foreground">JUICE BOX STUDIOS</span>
            </div>
            <div className="flex gap-6 font-mono text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Twitter</a>
              <a href="#" className="hover:text-primary transition-colors">Discord</a>
              <a href="#" className="hover:text-primary transition-colors">YouTube</a>
              <a href="#" className="hover:text-primary transition-colors">Steam</a>
            </div>
          </div>
          <div className="mt-8 text-center md:text-left text-xs text-muted-foreground/50 font-mono">
            &copy; {new Date().getFullYear()} Juice Box Studios. All rights reserved. Insert coin to continue.
          </div>
        </div>
      </footer>
    </div>
  );
}

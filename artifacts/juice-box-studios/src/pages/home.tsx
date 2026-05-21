import React, { useRef } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { ArrowRight, Sword, Scroll, Flame, Star, Sparkles, Crown } from "lucide-react";
import logoPath from "@/assets/images/juice-box-logo.png";
import heroBg from "@/assets/images/hero-bg.png";
import game1 from "@/assets/images/game-1.png";
import game2 from "@/assets/images/game-2.png";
import game3 from "@/assets/images/game-3.png";
import studioBg from "@/assets/images/studio.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const discordInviteUrl = "https://discord.gg/hHdfWYGKW";
const contactEmail = "juiceboxstudios999@gmail.com";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground overflow-hidden font-sans relative">
      <div className="scanline" />
      
      {/* Navigation */}
      <nav aria-label="Primary navigation" className="fixed top-0 left-0 right-0 z-50 p-4 sm:p-6 flex justify-between items-center gap-4 backdrop-blur-md border-b border-white/5 bg-background/50">
        <div className="flex items-center gap-3">
          <img src={logoPath} alt="Juice Box Studios" className="h-10 w-auto" />
          <span className="font-bold text-lg lg:text-xl tracking-tighter hidden sm:inline-block cinzel text-glow">JUICE BOX STUDIOS</span>
        </div>
        <div className="hidden md:flex items-center gap-6 font-sans font-bold text-sm uppercase tracking-wider">
          <a href="#lore" className="hover:text-primary transition-colors">Lore</a>
          <a href="#realms" className="hover:text-secondary transition-colors">Realms</a>
          <a href="#guild" className="hover:text-accent transition-colors">Guild</a>
          <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold border-none rounded-sm uppercase box-glow-accent cinzel tracking-widest">
            <a href="#join">Join the Order</a>
          </Button>
        </div>
        <Button asChild size="sm" className="md:hidden bg-accent text-accent-foreground hover:bg-accent/90 font-bold border-none rounded-sm uppercase box-glow-accent cinzel tracking-widest">
          <a href="#join">Join</a>
        </Button>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center pt-20">
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-background/70 z-10" />
          <img src={heroBg} alt="" aria-hidden="true" className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-20" />
        </motion.div>
        
        <div className="relative z-30 container mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl mx-auto flex flex-col items-center gap-8"
          >
            <motion.div variants={fadeUp} className="inline-block px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-primary font-sans text-sm font-bold uppercase tracking-widest box-glow">
              <Sparkles className="w-4 h-4 inline-block mr-2 -mt-1" />
              The Summoning Begins
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl lg:text-8xl font-black leading-none tracking-tighter cinzel rune-glow">
              WE FORGE WORLDS FROM <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">DARKNESS AND LIGHT</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl md:text-2xl text-muted-foreground font-sans max-w-2xl leading-relaxed">
              Born of ancient magic, fueled by arcane power. We weave deep lore and breathtaking worlds for those who seek the extraordinary.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto">
              <Button asChild size="lg" className="bg-primary text-white hover:bg-primary/80 h-14 px-6 sm:px-8 text-base sm:text-lg font-bold rounded-sm uppercase tracking-wider box-glow cinzel w-full sm:w-auto">
                <a href="#realms">Explore the Realms</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/20 hover:bg-white/5 h-14 px-6 sm:px-8 text-base sm:text-lg font-bold rounded-sm uppercase tracking-wider cinzel w-full sm:w-auto">
                <a href="#lore">Read the Tomes</a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Manifesto / Lore Section */}
      <section id="lore" className="py-32 relative">
        <div className="absolute inset-0 grid-bg opacity-40 z-0" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
          >
            <motion.div variants={fadeUp} className="p-8 border border-white/5 bg-card/60 backdrop-blur-sm relative overflow-hidden group rounded-sm">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/40 transition-colors" />
              <Scroll className="w-12 h-12 text-primary mb-6" />
              <h3 className="text-2xl font-bold mb-4 cinzel tracking-wide">LORE DEPTH</h3>
              <p className="text-muted-foreground font-sans leading-relaxed">We weave intricate histories and deep mythologies. Every ruined castle and enchanted forest holds secrets waiting to be uncovered by those brave enough to look.</p>
            </motion.div>
            <motion.div variants={fadeUp} className="p-8 border border-white/5 bg-card/60 backdrop-blur-sm relative overflow-hidden group rounded-sm">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/20 rounded-full blur-3xl group-hover:bg-secondary/40 transition-colors" />
              <Sword className="w-12 h-12 text-secondary mb-6" />
              <h3 className="text-2xl font-bold mb-4 cinzel tracking-wide">ARCANE CRAFT</h3>
              <p className="text-muted-foreground font-sans leading-relaxed">From the weight of a broadsword to the crackle of a fire spell, we hone the mechanics of combat until they feel as natural as breathing.</p>
            </motion.div>
            <motion.div variants={fadeUp} className="p-8 border border-white/5 bg-card/60 backdrop-blur-sm relative overflow-hidden group rounded-sm">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl group-hover:bg-accent/40 transition-colors" />
              <Crown className="w-12 h-12 text-accent mb-6" />
              <h3 className="text-2xl font-bold mb-4 cinzel tracking-wide">LIVING WORLDS</h3>
              <p className="text-muted-foreground font-sans leading-relaxed">Our realms breathe and evolve. Factions rise and fall, seasons change, and the choices you make shape the destiny of empires.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Realms / Games Section */}
      <section id="realms" className="py-32 relative bg-black/60">
        <div className="container mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-20 text-center"
          >
            <h2 className="text-5xl md:text-7xl font-black mb-6 uppercase tracking-tighter cinzel rune-glow">Our Realms</h2>
            <p className="text-xl text-muted-foreground font-sans max-w-2xl mx-auto">Three forgotten kingdoms. Three epic sagas to unfold.</p>
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
                <img src={game1} alt="Crown of Ash" className="relative rounded-sm border border-white/10 shadow-2xl z-10 w-full object-cover aspect-video" />
              </motion.div>
              <motion.div variants={fadeUp} className="flex flex-col gap-6 lg:pl-12">
                <div className="font-sans text-primary font-bold tracking-widest uppercase flex items-center gap-2"><Flame className="w-4 h-4"/> Now Forging</div>
                <h3 className="text-5xl font-black text-glow cinzel tracking-tighter">CROWN OF ASH</h3>
                <p className="text-lg text-muted-foreground font-sans leading-relaxed">
                  A brutal action RPG where a fallen knight battles through a crumbling empire. Master heavy combat, gather the ashes of fallen lords, and reclaim your lost humanity in a dying world.
                </p>
                <div className="flex gap-4">
                  <Button className="bg-primary text-white hover:bg-primary/80 rounded-sm font-bold px-8 h-12 uppercase cinzel tracking-widest">Enter the Citadel</Button>
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
                <div className="font-sans text-secondary font-bold tracking-widest uppercase">The Seed is Planted</div>
                <h3 className="text-5xl font-black text-glow-secondary cinzel tracking-tighter">VERDANT COVENANT</h3>
                <p className="text-lg text-muted-foreground font-sans leading-relaxed">
                  A lush open-world adventure set in an ancient, living forest. Walk the path of the Druid, commune with nature spirits, solve environmental mysteries, and heal the blight that corrupts the deep woods.
                </p>
                <div className="flex gap-4">
                  <Button className="bg-secondary text-black hover:bg-secondary/80 rounded-sm font-bold px-8 h-12 uppercase box-glow-secondary cinzel tracking-widest">Pledge to the Grove</Button>
                </div>
              </motion.div>
              <motion.div variants={fadeUp} className="relative group order-1 lg:order-2">
                <div className="absolute -inset-4 bg-secondary/20 blur-2xl group-hover:bg-secondary/30 transition-colors rounded-[2rem]" />
                <img src={game2} alt="Verdant Covenant" className="relative rounded-sm border border-white/10 shadow-2xl z-10 w-full object-cover aspect-video" />
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
                <img src={game3} alt="The Hollow Throne" className="relative rounded-sm border border-white/10 shadow-2xl z-10 w-full object-cover aspect-video" />
              </motion.div>
              <motion.div variants={fadeUp} className="flex flex-col gap-6 lg:pl-12">
                <div className="font-sans text-accent font-bold tracking-widest uppercase">Prophecies Spoken</div>
                <h3 className="text-5xl font-black text-glow-accent cinzel tracking-tighter">THE HOLLOW THRONE</h3>
                <p className="text-lg text-muted-foreground font-sans leading-relaxed">
                  A gothic strategy game where you must rebuild a shattered kingdom from absolute ruin. Command skeleton legions, manage dark resources, and defend your obsidian throne against encroaching holy orders.
                </p>
                <div className="flex gap-4">
                  <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-black rounded-sm font-bold px-8 h-12 uppercase transition-all cinzel tracking-widest">Summon the Council</Button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Guild Hall / Studio Section */}
      <section id="guild" className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={studioBg} alt="The Guild Hall" className="w-full h-full object-cover opacity-20" />
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
            <motion.h2 variants={fadeUp} className="text-5xl md:text-7xl font-black mb-8 cinzel tracking-tighter rune-glow">THE GUILD HALL</motion.h2>
            <motion.p variants={fadeUp} className="text-xl text-muted-foreground font-sans leading-relaxed mb-12">
              We are an ancient order of scribes, artisans, and mages who spent too much time poring over old tomes and not enough time in the sun. We forge our own path, believing in worlds that feel heavy, mysterious, and awe-inspiring.
            </motion.p>
            
            <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-b border-white/10 py-12">
              <div>
                <div className="text-4xl font-black text-primary mb-2 cinzel">3</div>
                <div className="font-sans text-sm text-muted-foreground uppercase font-bold tracking-widest">Original Realms</div>
              </div>
              <div>
                <div className="text-4xl font-black text-secondary mb-2 cinzel">12</div>
                <div className="font-sans text-sm text-muted-foreground uppercase font-bold tracking-widest">Guild Members</div>
              </div>
              <div>
                <div className="text-4xl font-black text-accent mb-2 cinzel">0</div>
                <div className="font-sans text-sm text-muted-foreground uppercase font-bold tracking-widest">Paid Expansions</div>
              </div>
              <div>
                <div className="text-4xl font-black text-white mb-2 cinzel">100%</div>
                <div className="font-sans text-sm text-muted-foreground uppercase font-bold tracking-widest">Indie Spirit</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA / Newsletter */}
      <section id="join" className="py-32 bg-primary/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="max-w-2xl mx-auto text-center"
          >
            <Star className="w-16 h-16 text-primary mx-auto mb-8" />
            <h2 className="text-4xl md:text-5xl font-black mb-6 uppercase cinzel tracking-tight">Heed the Call</h2>
            <p className="text-lg text-muted-foreground font-sans mb-8">
              Join the order's messaging scroll. Receive whispered prophecies, closed beta access rituals, and forbidden development knowledge.
            </p>
            <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
              <Input 
                type="email" 
                name="email"
                aria-label="Email address"
                placeholder="ENTER YOUR SIGIL (EMAIL)" 
                className="h-14 bg-black/60 border-white/20 font-sans text-lg rounded-sm focus-visible:ring-primary"
              />
              <Button type="submit" className="h-14 px-8 bg-primary text-white font-bold text-lg rounded-sm uppercase hover:bg-primary/80 shrink-0 cinzel tracking-widest">
                Swear Oath <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </form>
            <p className="mt-6 text-sm text-muted-foreground font-sans">
              Prefer the tavern fire?{" "}
              <a href={discordInviteUrl} target="_blank" rel="noreferrer" className="font-bold text-primary hover:text-primary/80 transition-colors">
                Join the Discord
              </a>{" "}
              or send a scroll to{" "}
              <a href={`mailto:${contactEmail}`} className="font-bold text-primary hover:text-primary/80 transition-colors">
                {contactEmail}
              </a>
              .
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <img src={logoPath} alt="Juice Box Studios" className="h-8 w-auto grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all" />
              <span className="font-bold tracking-tighter text-muted-foreground cinzel">JUICE BOX STUDIOS</span>
            </div>
            <div className="flex flex-col items-center md:items-end gap-3">
              <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-3 font-sans font-bold text-sm text-muted-foreground uppercase tracking-widest">
                <a href="#" className="hover:text-primary transition-colors">Ravens (Twitter)</a>
                <a href={discordInviteUrl} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">Tavern (Discord)</a>
                <a href="#" className="hover:text-primary transition-colors">Visions (YouTube)</a>
                <a href="#" className="hover:text-primary transition-colors">Steam</a>
              </div>
              <a href={`mailto:${contactEmail}`} className="font-sans text-sm text-muted-foreground hover:text-primary transition-colors">
                {contactEmail}
              </a>
            </div>
          </div>
          <div className="mt-8 text-center md:text-left text-xs text-muted-foreground/50 font-sans">
            &copy; {new Date().getFullYear()} Juice Box Studios. All rights reserved. May your journey never end.
          </div>
        </div>
      </footer>
    </div>
  );
}

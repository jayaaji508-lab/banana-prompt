/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, 
  Plus, 
  Image as ImageIcon, 
  Video, 
  Copy, 
  Check, 
  TrendingUp, 
  Sparkles,
  Info,
  X,
  ExternalLink,
  Github,
  Twitter
} from "lucide-react";

// --- Types ---
interface Prompt {
  id: string;
  title: string;
  prompt: string;
  type: "image" | "video";
  imageUrl: string;
  author: string;
  likes: number;
  tags: string[];
}

// --- Mock Data ---
const MOCK_PROMPTS: Prompt[] = [
  {
    id: "1",
    title: "Cyberpunk Neon City",
    prompt: "A futuristic cyberpunk city street at night, neon signs in Japanese, heavy rain, cinematic lighting, ultra-detailed, 8k resolution, volumetric fog.",
    type: "image",
    imageUrl: "https://picsum.photos/seed/cyberpunk/800/600",
    author: "NeonDreamer",
    likes: 1240,
    tags: ["Cyberpunk", "Neon", "City"]
  },
  {
    id: "2",
    title: "Ethereal Forest Spirit",
    prompt: "A glowing ethereal spirit in the shape of a deer walking through a mystical ancient forest, bioluminescent plants, soft morning light, Studio Ghibli style.",
    type: "image",
    imageUrl: "https://picsum.photos/seed/forest/800/600",
    author: "SpiritWalker",
    likes: 890,
    tags: ["Fantasy", "Nature", "Ghibli"]
  },
  {
    id: "3",
    title: "Astronaut in Flower Field",
    prompt: "A cinematic shot of an astronaut sitting in a vast field of colorful wildflowers on a distant planet, two moons in the sky, hyper-realistic, surrealism.",
    type: "image",
    imageUrl: "https://picsum.photos/seed/space/800/600",
    author: "StarGazer",
    likes: 2100,
    tags: ["Space", "Surreal", "Astronaut"]
  },
  {
    id: "4",
    title: "Steampunk Airship",
    prompt: "A massive steampunk airship flying through golden clouds at sunset, intricate brass details, smoke coming from chimneys, Victorian aesthetic, high fantasy.",
    type: "image",
    imageUrl: "https://picsum.photos/seed/steampunk/800/600",
    author: "GearHead",
    likes: 560,
    tags: ["Steampunk", "Fantasy", "Airship"]
  },
  {
    id: "5",
    title: "Underwater Lost City",
    prompt: "A wide shot of a sunken ancient Greek city underwater, schools of fish swimming through marble columns, sun rays piercing through the water, cinematic.",
    type: "image",
    imageUrl: "https://picsum.photos/seed/underwater/800/600",
    author: "DeepDiver",
    likes: 1540,
    tags: ["Underwater", "Ancient", "City"]
  },
  {
    id: "6",
    title: "Mechanical Dragon",
    prompt: "A close-up of a mechanical dragon made of clockwork gears and polished chrome, glowing blue eyes, breathing steam, intricate engineering, dark background.",
    type: "image",
    imageUrl: "https://picsum.photos/seed/dragon/800/600",
    author: "ClockworkKing",
    likes: 3200,
    tags: ["Mechanical", "Dragon", "Sci-Fi"]
  }
];

// --- Components ---

const SubmitModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-lg rounded-3xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl"
      >
        <button 
          onClick={onClose}
          className="absolute right-6 top-6 text-zinc-500 hover:text-white"
        >
          <X className="h-6 w-6" />
        </button>
        
        <h2 className="mb-2 text-2xl font-bold text-white">Submit your prompt</h2>
        <p className="mb-8 text-sm text-zinc-400">
          Share your creativity with the community. We'll review and post it soon!
        </p>
        
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Title</label>
            <input 
              type="text" 
              placeholder="e.g. Cyberpunk Samurai" 
              className="w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 text-white focus:border-yellow-400 focus:outline-none"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Full Prompt</label>
            <textarea 
              placeholder="Paste your exact AI prompt here..." 
              className="h-32 w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 text-white focus:border-yellow-400 focus:outline-none resize-none"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Type</label>
              <select className="w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 text-white focus:border-yellow-400 focus:outline-none">
                <option value="image">Image</option>
                <option value="video">Video</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Model</label>
              <select className="w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 text-white focus:border-yellow-400 focus:outline-none">
                <option value="midjourney">Midjourney</option>
                <option value="dalle">DALL-E 3</option>
                <option value="stable-diffusion">Stable Diffusion</option>
                <option value="luma">Luma Dream Machine</option>
              </select>
            </div>
          </div>
          
          <button 
            type="submit"
            className="w-full rounded-2xl bg-yellow-400 py-4 font-bold text-black transition-transform hover:scale-[1.02] active:scale-95"
          >
            Submit for Review
          </button>
        </form>
      </motion.div>
    </div>
  );
};

const PromptCard = ({ prompt }: { prompt: Prompt }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(prompt.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/30 transition-all hover:border-zinc-700 hover:bg-zinc-900/50"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={prompt.imageUrl} 
          alt={prompt.title}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-0 transition-opacity group-hover:opacity-100">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-zinc-800 p-0.5">
              <img 
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${prompt.author}`} 
                alt={prompt.author}
                className="h-full w-full rounded-full"
              />
            </div>
            <span className="text-xs font-medium text-white">@{prompt.author}</span>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 backdrop-blur-md">
            <TrendingUp className="h-3 w-3 text-yellow-400" />
            <span className="text-[10px] font-bold text-white">{prompt.likes}</span>
          </div>
        </div>

        <div className="absolute right-4 top-4">
          <div className="rounded-full bg-black/50 p-2 backdrop-blur-md">
            {prompt.type === "image" ? <ImageIcon className="h-4 w-4 text-white" /> : <Video className="h-4 w-4 text-white" />}
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-2 text-lg font-bold text-white line-clamp-1">{prompt.title}</h3>
        <div className="relative mb-4 flex-1">
          <p className="text-sm text-zinc-400 line-clamp-3 italic">
            "{prompt.prompt}"
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {prompt.tags.map(tag => (
            <span key={tag} className="rounded-md bg-zinc-800/50 px-2 py-0.5 text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
              #{tag}
            </span>
          ))}
        </div>

        <button 
          onClick={copyToClipboard}
          className={`flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-bold transition-all ${
            copied ? "bg-green-500 text-white" : "bg-zinc-800 text-white hover:bg-zinc-700"
          }`}
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Copy Prompt
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
};

const Footer = () => (
  <footer className="border-t border-zinc-800 bg-black py-12">
    <div className="container mx-auto px-4 md:px-6">
      <div className="grid gap-8 md:grid-cols-4">
        <div className="col-span-2">
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-400 text-black">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold text-white">Banana Prompts</span>
          </div>
          <p className="mb-6 max-w-sm text-sm text-zinc-500">
            The community-driven library for AI prompts. We believe in open-source creativity. 
            Share your best prompts and help others learn the art of AI generation.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-zinc-500 transition-colors hover:text-white"><Twitter className="h-5 w-5" /></a>
            <a href="#" className="text-zinc-500 transition-colors hover:text-white"><Github className="h-5 w-5" /></a>
          </div>
        </div>
        
        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Platform</h4>
          <ul className="space-y-2 text-sm text-zinc-500">
            <li><a href="#" className="hover:text-white">Explore</a></li>
            <li><a href="#" className="hover:text-white">Trending</a></li>
            <li><a href="#" className="hover:text-white">Submit Prompt</a></li>
            <li><a href="#" className="hover:text-white">Guidelines</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Company</h4>
          <ul className="space-y-2 text-sm text-zinc-500">
            <li><a href="#" className="hover:text-white">About Us</a></li>
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white">Terms of Service</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
          </ul>
        </div>
      </div>
      
      <div className="mt-12 border-t border-zinc-900 pt-8 text-center text-xs text-zinc-600">
        © {new Date().getFullYear()} Banana Prompts. All rights reserved. Built for the AI community.
      </div>
    </div>
  </footer>
);

const WhySection = () => (
  <section className="bg-zinc-900/30 py-20">
    <div className="container mx-auto px-4 md:px-6">
      <div className="grid gap-12 md:grid-cols-2 md:items-center">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-yellow-400/10 px-3 py-1 text-xs font-bold text-yellow-400 uppercase tracking-widest">
            <Info className="h-3 w-3" />
            Our Mission
          </div>
          <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            Why we share <br />
            <span className="text-yellow-400">every single prompt.</span>
          </h2>
          <p className="mb-8 text-lg text-zinc-400">
            AI art is a collaborative journey. By sharing the exact prompts used to create stunning visuals, 
            we empower creators to learn, iterate, and push the boundaries of what's possible.
          </p>
          <ul className="space-y-4">
            {[
              "Learn the syntax of different AI models",
              "Discover hidden keywords and modifiers",
              "Save hours of trial and error",
              "Build on top of community masterpieces"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-zinc-300">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-yellow-400 text-black">
                  <Check className="h-3 w-3" />
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 rounded-3xl bg-yellow-400/20 blur-2xl" />
          <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-black p-8 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-green-500" />
              </div>
              <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">prompt_editor.sh</div>
            </div>
            <div className="space-y-4 font-mono text-sm">
              <p className="text-zinc-500"># Generating masterpiece...</p>
              <p className="text-white">
                <span className="text-yellow-400">/imagine</span> prompt: 
                <span className="text-zinc-300"> cinematic shot of a futuristic banana spaceship orbiting a neon planet, 8k, hyper-realistic --v 6.0</span>
              </p>
              <div className="h-40 w-full rounded-lg bg-zinc-900 flex items-center justify-center border border-zinc-800">
                <Sparkles className="h-8 w-8 text-yellow-400/20 animate-pulse" />
              </div>
              <p className="text-green-400">✓ Generation complete</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default function App() {
  const [filter, setFilter] = useState<"all" | "image" | "video">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredPrompts = MOCK_PROMPTS.filter(p => {
    const matchesFilter = filter === "all" || p.type === filter;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-black text-zinc-200 selection:bg-yellow-400 selection:text-black">
      <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-black/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-400 text-black shadow-[0_0_20px_rgba(250,204,21,0.3)]">
              <Sparkles className="h-6 w-6" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Banana Prompts</span>
          </div>
          
          <nav className="hidden items-center gap-6 md:flex">
            <a href="#" className="text-sm font-medium text-zinc-400 transition-colors hover:text-white">Explore</a>
            <a href="#" className="text-sm font-medium text-zinc-400 transition-colors hover:text-white">Trending</a>
            <a href="#" className="text-sm font-medium text-zinc-400 transition-colors hover:text-white">Community</a>
          </nav>

          <div className="flex items-center gap-4">
            <button className="hidden h-9 items-center justify-center rounded-lg px-4 text-sm font-medium text-white transition-colors hover:bg-zinc-900 md:flex">
              Sign In
            </button>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex h-9 items-center justify-center gap-2 rounded-lg bg-white px-4 text-sm font-medium text-black transition-transform active:scale-95"
            >
              <Plus className="h-4 w-4" />
              Submit
            </button>
          </div>
        </div>
      </header>
      
      <main>
        <section className="relative overflow-hidden py-20 md:py-32">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(250,204,21,0.1),transparent_50%)]" />
          <div className="container mx-auto px-4 text-center md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="mb-6 text-5xl font-extrabold tracking-tighter text-white md:text-7xl lg:text-8xl">
                Share the prompts <br />
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">behind the art.</span>
              </h1>
              <p className="mx-auto mb-10 max-w-2xl text-lg text-zinc-400 md:text-xl">
                Discover trending AI images and videos that inspire your next creation. 
                See what the community is creating and loving right now.
              </p>
              
              <div className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search prompts (e.g. 'Cyberpunk', 'Ghibli')..." 
                    className="h-12 w-full rounded-xl border border-zinc-800 bg-zinc-900/50 pl-10 pr-4 text-white placeholder:text-zinc-600 focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                  />
                </div>
                <button className="h-12 rounded-xl bg-yellow-400 px-8 font-bold text-black transition-transform hover:scale-105 active:scale-95">
                  Search
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="container mx-auto px-4 pb-20 md:px-6">
          <div className="mb-10 flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-1">
              <button 
                onClick={() => setFilter("all")}
                className={`rounded-xl px-6 py-2 text-sm font-bold transition-all ${
                  filter === "all" ? "bg-yellow-400 text-black" : "text-zinc-400 hover:text-white"
                }`}
              >
                All
              </button>
              <button 
                onClick={() => setFilter("image")}
                className={`rounded-xl px-6 py-2 text-sm font-bold transition-all ${
                  filter === "image" ? "bg-yellow-400 text-black" : "text-zinc-400 hover:text-white"
                }`}
              >
                Images
              </button>
              <button 
                onClick={() => setFilter("video")}
                className={`rounded-xl px-6 py-2 text-sm font-bold transition-all ${
                  filter === "video" ? "bg-yellow-400 text-black" : "text-zinc-400 hover:text-white"
                }`}
              >
                Videos
              </button>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-zinc-500">
                Showing {filteredPrompts.length} prompts
              </span>
              <div className="h-4 w-px bg-zinc-800" />
              <select className="bg-transparent text-sm font-bold text-white outline-none cursor-pointer">
                <option value="trending">Trending</option>
                <option value="newest">Newest</option>
                <option value="popular">Most Liked</option>
              </select>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:cols-3">
            <AnimatePresence mode="popLayout">
              {filteredPrompts.map((prompt) => (
                <div key={prompt.id}>
                  <PromptCard prompt={prompt} />
                </div>
              ))}
            </AnimatePresence>
          </div>
          
          {filteredPrompts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="mb-4 rounded-full bg-zinc-900 p-6">
                <Search className="h-10 w-10 text-zinc-700" />
              </div>
              <h3 className="text-xl font-bold text-white">No prompts found</h3>
              <p className="text-zinc-500">Try adjusting your search or filters.</p>
            </div>
          )}
        </section>

        <WhySection />
        
        <section className="container mx-auto px-4 py-20 text-center md:px-6">
          <div className="rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900/50 to-transparent p-12 md:p-20">
            <h2 className="mb-6 text-3xl font-bold text-white md:text-5xl">
              Ready to teach the community?
            </h2>
            <p className="mx-auto mb-10 max-w-xl text-zinc-400">
              Submit your favorite prompts and help others discover the magic of AI art. 
              Join thousands of creators sharing their secrets.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="h-14 w-full rounded-2xl bg-white px-10 font-bold text-black transition-transform hover:scale-105 active:scale-95 sm:w-auto"
              >
                Submit Your Prompt
              </button>
              <button className="h-14 w-full rounded-2xl border border-zinc-700 px-10 font-bold text-white transition-colors hover:bg-zinc-800 sm:w-auto">
                Join Discord
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      
      <AnimatePresence>
        <SubmitModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </AnimatePresence>
    </div>
  );
}

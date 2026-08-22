import React, { useState, useRef, useEffect } from "react";

// ---------- Fonts & global style ----------
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,600;0,9..144,900;1,9..144,600&family=Inter:wght@400;500;600;700&display=swap');

    .sd-root {
      --bg: #1c0f14;
      --bg-2: #2a1420;
      --card: #2f1720;
      --gold: #cf9d3f;
      --rose: #ff4d6d;
      --ink: #f3ece4;
      --ink-dim: #c9b8ae;
      --line: rgba(243,236,228,0.10);
      font-family: 'Inter', sans-serif;
      background: radial-gradient(120% 140% at 15% -10%, #3a1a24 0%, var(--bg) 55%, #120a0d 100%);
      color: var(--ink);
      min-height: 100vh;
      width: 100%;
      display: flex;
      justify-content: center;
    }
    .sd-shell {
      width: 100%;
      max-width: 480px;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      position: relative;
    }
    .sd-display { font-family: 'Fraunces', serif; }
    .sd-topbar {
      display: flex; align-items: center; justify-content: space-between;
      padding: 18px 20px 14px; position: sticky; top: 0; z-index: 20;
      background: linear-gradient(180deg, var(--bg) 70%, transparent);
    }
    .sd-logo { font-family:'Fraunces',serif; font-weight: 900; font-size: 22px; letter-spacing: 0.3px; }
    .sd-logo span { color: var(--rose); font-style: italic; }
    .sd-coins {
      display:flex; align-items:center; gap:6px; background: var(--card);
      border: 1px solid var(--line); padding: 6px 12px; border-radius: 999px;
      font-size: 13px; font-weight:600; color: var(--gold);
    }
    .sd-scroll { flex: 1; overflow-y: auto; padding-bottom: 100px; }
    .sd-section-title {
      display:flex; align-items:baseline; gap:10px;
      padding: 6px 20px 12px; margin-top: 8px;
    }
    .sd-section-title h2 { font-family:'Fraunces',serif; font-weight:600; font-size:19px; margin:0; }
    .sd-section-title small { color: var(--ink-dim); font-size:12px; }
    .sd-rail { display:flex; gap:14px; overflow-x:auto; padding: 4px 20px 10px; scrollbar-width:none; }
    .sd-rail::-webkit-scrollbar{display:none;}
    .sd-card {
      flex: 0 0 148px; cursor:pointer; position:relative;
    }
    .sd-poster {
      width:148px; height:198px; border-radius:14px; position:relative; overflow:hidden;
      box-shadow: 0 10px 24px rgba(0,0,0,0.45);
      display:flex; align-items:flex-end; padding: 12px;
      border: 1px solid rgba(255,255,255,0.08);
    }
    .sd-poster:before {
      content:''; position:absolute; inset:0;
      background: linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,0.75) 100%);
    }
    .sd-poster .sd-ep-count {
      position:absolute; top:10px; right:10px; background:rgba(0,0,0,0.5);
      border-radius:999px; font-size:10px; padding:3px 8px; z-index:2; font-weight:600;
    }
    .sd-poster .sd-title-on-card {
      position:relative; z-index:2; font-family:'Fraunces',serif; font-weight:600;
      font-size:15px; line-height:1.15;
    }
    .sd-genre-tag {
      display:inline-block; font-size:10px; letter-spacing:0.6px; text-transform:uppercase;
      color: var(--gold); margin-top:6px; font-weight:700;
    }
    .sd-grid-2 { display:grid; grid-template-columns: 1fr 1fr; gap:14px; padding: 6px 20px 30px; }
    .sd-grid-2 .sd-poster { width:100%; height:210px; }
    .sd-grid-2 .sd-card { flex-basis:auto; }

    .sd-backbtn {
      display:flex; align-items:center; gap:6px; color: var(--ink-dim);
      background:none; border:none; font-size:14px; cursor:pointer; padding:0;
    }
    .sd-series-hero {
      padding: 18px 20px 10px;
    }
    .sd-series-hero .sd-poster { width:100%; height:230px; margin-bottom:14px; }
    .sd-series-hero h1 { font-family:'Fraunces',serif; font-size:26px; margin:4px 0 6px; }
    .sd-logline { color: var(--ink-dim); font-size:14px; line-height:1.5; margin-bottom:14px; }
    .sd-eplist { padding: 4px 20px 40px; display:flex; flex-direction:column; gap:8px; }
    .sd-ep-row {
      display:flex; align-items:center; justify-content:space-between;
      background: var(--card); border:1px solid var(--line); border-radius:12px;
      padding: 13px 16px; cursor:pointer;
    }
    .sd-ep-row .num { color: var(--gold); font-weight:700; font-size:13px; width:26px; }
    .sd-ep-row .t { flex:1; font-size:14px; font-weight:500; }
    .sd-lock { color: var(--rose); font-size:16px; }

    .sd-reader { padding: 10px 22px 140px; }
    .sd-reader .ep-eyebrow { color: var(--gold); font-size:11px; letter-spacing:1.5px; text-transform:uppercase; font-weight:700; margin-bottom:6px;}
    .sd-reader h1 { font-family:'Fraunces',serif; font-size:24px; margin: 0 0 18px; line-height:1.2;}
    .sd-reader p { font-size:15.5px; line-height:1.85; color: #ece3da; margin-bottom:14px; white-space: pre-wrap; }
    .sd-reader p.dialogue { color: #fff; font-weight: 500;}

    .sd-nextbar {
      position: fixed; bottom:0; left:50%; transform:translateX(-50%);
      width:100%; max-width:480px; padding: 16px 20px 22px;
      background: linear-gradient(0deg, var(--bg) 55%, transparent);
      display:flex; justify-content:center; z-index: 30;
    }
    .sd-btn {
      border:none; cursor:pointer; font-family:'Inter',sans-serif; font-weight:700;
      border-radius:999px; padding: 14px 26px; font-size:14.5px; letter-spacing:0.2px;
      display:flex; align-items:center; gap:8px; justify-content:center;
    }
    .sd-btn-primary { background: linear-gradient(90deg,var(--rose),#ff7a90); color:#1c0f14; width:100%; }
    .sd-btn-primary:disabled { opacity:0.6; cursor:progress; }
    .sd-btn-ghost { background: var(--card); color: var(--ink); border:1px solid var(--line); width:100%; }
    .sd-btn-gold { background: linear-gradient(90deg,var(--gold),#e8c76f); color:#241206; width:100%; }

    .sd-modal-backdrop {
      position:fixed; inset:0; background:rgba(10,5,6,0.72); backdrop-filter: blur(3px);
      display:flex; align-items:flex-end; justify-content:center; z-index:50;
    }
    .sd-modal {
      width:100%; max-width:480px; background: var(--bg-2); border-top-left-radius:22px;
      border-top-right-radius:22px; padding: 26px 22px 30px; border-top:1px solid var(--line);
    }
    .sd-modal h3 { font-family:'Fraunces',serif; font-size:21px; margin: 0 0 6px; }
    .sd-modal p.sub { color: var(--ink-dim); font-size:13.5px; margin-bottom:20px; }
    .sd-option {
      display:flex; align-items:center; justify-content:space-between; gap:12px;
      background: var(--card); border:1px solid var(--line); border-radius:14px;
      padding: 14px 16px; margin-bottom:10px; cursor:pointer;
    }
    .sd-option .lab { font-weight:700; font-size:14.5px; }
    .sd-option .desc { color: var(--ink-dim); font-size:12px; margin-top:2px; }
    .sd-option .price { color: var(--gold); font-weight:800; font-size:14px; }
    .sd-save-badge {
      position:absolute; top:-10px; left:16px; background: var(--rose); color:#1c0f14;
      font-size:9.5px; font-weight:800; letter-spacing:0.5px; padding:3px 8px; border-radius:999px;
    }
    .sd-close { text-align:center; color: var(--ink-dim); font-size:13px; margin-top:8px; cursor:pointer; }

    .sd-ad-banner {
      background: var(--card); border:1px dashed rgba(207,157,63,0.5); border-radius:12px;
      padding: 12px 16px; margin: 0 20px 14px; display:flex; align-items:center; justify-content:space-between;
      font-size:12px; color: var(--ink-dim);
    }
    .sd-ad-banner b { color: var(--gold); }
    .sd-empty { padding: 60px 30px; text-align:center; color: var(--ink-dim); font-size:14px; }
    .sd-loading-dots span { animation: sd-blink 1.2s infinite; }
    .sd-loading-dots span:nth-child(2){ animation-delay:0.2s; }
    .sd-loading-dots span:nth-child(3){ animation-delay:0.4s; }
    @keyframes sd-blink { 0%,80%,100%{opacity:0.2} 40%{opacity:1} }
  `}</style>
);

// ---------- Seed data ----------
const GRADIENTS = {
  crimson: "linear-gradient(160deg,#7a1730,#2a0e18)",
  gold: "linear-gradient(160deg,#8a6a1f,#241608)",
  plum: "linear-gradient(160deg,#4a1f5c,#1c0f22)",
  slate: "linear-gradient(160deg,#1f3350,#0d1420)",
  emerald: "linear-gradient(160deg,#1c4a3a,#0d1c16)",
  wine: "linear-gradient(160deg,#5c1a3f,#20081a)",
  copper: "linear-gradient(160deg,#7a3d1f,#25120a)",
  ink: "linear-gradient(160deg,#252b45,#0b0c17)",
  rosegold: "linear-gradient(160deg,#8a4a52,#2a1216)",
};

const SEED_SERIES = [
  {
    id: "s1",
    title: "The Billionaire's Fake Fiancée",
    genre: "Billionaire Romance",
    grad: GRADIENTS.crimson,
    logline:
      "She agreed to a fake engagement to save her family's company. She didn't agree to fall in love with the man who ruined her father.",
    episodes: [
      {
        title: "The Contract",
        body: `"Marry me," Damian Cole said, sliding the contract across the marble desk like it was nothing more than a lunch order.

Elena stared at him. "You destroyed my father's company. You have some nerve."

"I didn't destroy it. I bought what was left of it." He didn't even look up from his cufflinks. "Ninety days. My fiancée in public. Nothing in private. In exchange, your father keeps his house, his name, and his pride."

"And if I say no?"

He finally met her eyes, and for one second she saw something underneath the ice. "Then I own everything he has left by Friday."

Elena's hand hovered over the pen. Somewhere behind her, she swore she could hear her father's voice, twenty years ago, teaching her to never let anyone see her flinch.

She signed.

Damian exhaled like he'd been holding his breath the whole time — but by the time she looked up, his face had already gone back to unreadable.

"Welcome to the family, Ms. Reyes," he said. "Try not to fall in love with me."

She almost laughed. Almost.`,
      },
    ],
  },
  {
    id: "s2",
    title: "Vendetta",
    genre: "Revenge / Mafia",
    grad: GRADIENTS.slate,
    logline:
      "Ten years ago the Moretti family took everything from her. Now she's back — with a new name, a new face, and a seat at their table.",
    episodes: [
      {
        title: "A Seat At The Table",
        body: `No one in that room recognized the girl they'd left for dead in a burning warehouse ten years ago.

They saw "Adriana Cole," the sharp new acquisitions director with a flawless smile and an even more flawless resume. They didn't see the girl who used to hide under this exact table, listening to her father beg for his life.

"You're quiet tonight," said Nico Moretti, pouring her wine like he owned the air she breathed. Maybe he did. Not yet.

"I'm listening," she said. "I find people say more when they think no one's paying attention."

Nico smiled — the same smile his father used to wear right before he ruined someone.

"And what have you learned?"

Adriana lifted her glass. "That your family makes the same mistake twice. You let strangers get too close."

Under the table, her hand tightened around the flash drive taped to her thigh. Six months of evidence. One more dinner, and it would all be over.

"To new partnerships," Nico said, raising his glass.

"To old debts," Adriana thought, and smiled back.`,
      },
    ],
  },
  {
    id: "s3",
    title: "Second Chance Alpha",
    genre: "Fantasy Romance",
    grad: GRADIENTS.emerald,
    logline:
      "Rejected by her werewolf mate in front of the whole pack, Mia swore she'd never come back. Five years later, she returns as the strongest alpha the North has ever seen.",
    episodes: [
      {
        title: "The Rejection, Revisited",
        body: `Five years ago, Kane Ashworth had rejected her in front of three hundred wolves, his voice carrying across the ceremony grounds like a verdict. "She is not my mate. She is nothing."

Tonight, she walked back into that same hall, and every wolf in the room dropped to one knee before she'd said a word.

Kane didn't kneel. He stood frozen at the head of the table, staring at the crescent-moon mark now blazing gold on her collarbone — the mark of an Alpha of Alphas. A mark that hadn't existed five years ago. A mark that hadn't existed for two hundred years.

"Mia," he said, like her name was something he'd forgotten how to hold in his mouth.

"It's Alpha Reyes now," she said. "You'll address me properly, or you'll address my second."

Behind her, six warriors bared their teeth in perfect unison.

Kane's jaw tightened — the same stubborn line she used to trace with her fingers, back when she still thought she loved him.

"Why are you here?" he asked.

She smiled, slow and unbothered. "Your pack lands sit on a fault line, and my treaty says they're mine by sunrise. Did nobody tell you?"

The room went very, very quiet.`,
      },
    ],
  },
  {
    id: "s4",
    title: "Married By Monday",
    genre: "Flash Marriage / Enemies to Lovers",
    grad: GRADIENTS.rosegold,
    logline:
      "To save her sister's life, Ivy married a stranger she despised on sight. She didn't know he was the ruthless CEO she'd humiliated in a boardroom three years ago — and he never forgot her face.",
    episodes: [
      {
        title: "72 Hours To I Do",
        body: `"You have three days to find sixty thousand dollars, or your sister loses the transplant slot," the doctor said, not unkindly, but not gently either.

Ivy had four hundred dollars and a car worth less than that.

Which is how she ended up in a penthouse office at 11pm, signing a marriage contract with a man whose face she couldn't see because he was turned toward the window.

"Standard terms," the lawyer said. "One year. Public appearances only. He covers the medical costs in full."

"And in exchange?" Ivy asked.

The man finally turned around.

She knew that jaw. That voice. That exact curl of contempt at the corner of his mouth.

Three years ago, in a boardroom full of investors, twenty-three-year-old Ivy had stood up in her first real pitch meeting and called his family's company "a house of cards built by men who inherited their spines." She'd been escorted out. She'd never forgotten his face — pale with fury, silent, unmoving — while the whole room laughed.

"Hello, Ivy," said Julian Cross. "Small world."

Her stomach dropped through the floor.

"In exchange," he said, sliding the pen toward her, "you're going to spend the next year finding out exactly what it costs to embarrass me."

She picked up the pen anyway. Her sister didn't have a year to wait for pride.

"Fine," she said. "But I'm not sorry."

Something almost like a smile crossed his face. "You will be."`,
      },
    ],
  },
  {
    id: "s5",
    title: "The Heiress Nobody Knew",
    genre: "Secret Identity / Family Drama",
    grad: GRADIENTS.copper,
    logline:
      "Raised in foster care, Sophie never knew her real family owned half the city — until her dying grandmother's will named her sole heir, and three cousins decided she wouldn't live long enough to collect.",
    episodes: [
      {
        title: "The Will Reading",
        body: `Sophie had worn her one good blazer to the reading, certain there'd been a mistake. Why would a law firm summon a twenty-six-year-old barista to a room full of Whitmore family lawyers?

"The entirety of Eleanor Whitmore's estate," the attorney read, "including controlling shares of Whitmore Holdings, passes to her granddaughter, Sophie Chen."

Silence. Then chaos.

"This is absurd," snapped Preston Whitmore, Sophie's — apparently — cousin, a man in a suit that cost more than her rent. "She's not even family. She's some girl grandmother found in a phone book."

"DNA confirmed," the attorney said calmly. "Eleanor knew exactly what she was doing. There's a letter."

He slid an envelope across the table. Sophie's hands shook as she opened it.

My dearest Sophie — I let them take you from me twenty years ago because I was a coward, and I have spent every day since regretting it. I am giving you what should have always been yours. They will try to take it back. Don't let them. You are stronger than you know — you're a Whitmore.

Sophie looked up. Three cousins were staring at her like she was something to be scraped off a shoe.

"We'll be contesting this," Preston said.

Sophie folded the letter and, for the first time in her life, didn't look away first.

"Contest all you want," she said. "It's my company now."

Behind Preston's shoulder, a fourth Whitmore she hadn't been introduced to yet — silent, sharp-eyed — watched her with something that wasn't quite hatred.

She had a feeling she'd just made her first real enemy. And possibly something else.`,
      },
    ],
  },
  {
    id: "s6",
    title: "Die Once, Live Twice",
    genre: "Thriller / Reborn Revenge",
    grad: GRADIENTS.ink,
    logline:
      "Claire woke up on the morning of the day she died — three months earlier than her murder. This time, she knows exactly who killed her, and exactly how to make them pay before they ever get the chance.",
    episodes: [
      {
        title: "The Morning I Was Supposed to Forget",
        body: `Claire opened her eyes and knew, with total certainty, that she had died.

Not metaphorically. Not a bad dream. She remembered the parking garage, the cold, her sister-in-law's face — calm, almost bored — as she'd pulled the trigger.

And now it was March 14th again. The same gray light through the same curtains. Ninety-one days before her own murder.

Her hands were shaking, but her mind had never been clearer.

She had spent the last life trusting the wrong people. Being grateful for scraps. Dying confused, in the cold, wondering why.

Not this time.

She picked up her phone and opened her banking app first — she remembered every account Marissa had quietly drained over eleven months, every forged signature, every "loan" that funded a second apartment across town.

Then she opened her messages and found the contact she hadn't spoken to in this timeline yet: Daniel Ruiz, the private investigator she wouldn't hire until it was already too late, last time.

Her fingers hovered over the keyboard.

I need to hire you, she typed. I have ninety-one days, and I know exactly what you're going to find.

Downstairs, she heard Marissa's voice, sweet as always, calling up the stairs. "Claire? Coffee's ready!"

Claire looked at herself in the mirror — same face, same life, completely different woman behind the eyes.

"Coming," she called back, and smiled for the first time since she'd died.`,
      },
    ],
  },
];

const FREE_EPISODES = 3;

// ---------- Real Supabase connection ----------
const SUPABASE_URL = "https://oilzyptnhnvsnjklcmsw.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_3lrlt2MYQXx3Knew2cdV3w_joluhxVV";

async function supabaseSignUp(email, password) {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json", apikey: SUPABASE_ANON_KEY },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.msg || data.error_description || "Sign up failed");
  return data;
}

async function supabaseSignIn(email, password) {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: { "Content-Type": "application/json", apikey: SUPABASE_ANON_KEY },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.msg || data.error_description || "Sign in failed");
  return data; // { access_token, user, ... }
}

// ---------- API call to generate the next episode ----------
async function generateNextEpisode(series) {
  const response = await fetch(`${SUPABASE_URL}/functions/v1/generate-episode`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": SUPABASE_ANON_KEY,
      "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({
      title: series.title,
      genre: series.genre,
      logline: series.logline,
      episodes: series.episodes,
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Failed to generate episode");
  }
  return data;
}

// ---------- Main App ----------
function AuthScreen({ onAuthed }) {
  const [mode, setMode] = useState("signin"); // signin | signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notice, setNotice] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setNotice(null);
    try {
      if (mode === "signup") {
        const data = await supabaseSignUp(email, password);
        if (data.access_token) {
          onAuthed({ token: data.access_token, user: data.user });
        } else {
          setNotice("Account created! Check your email to confirm it, then sign in below.");
          setMode("signin");
        }
      } else {
        const data = await supabaseSignIn(email, password);
        onAuthed({ token: data.access_token, user: data.user });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="sd-root">
      <GlobalStyle />
      <div className="sd-shell" style={{ justifyContent: "center", padding: "0 28px" }}>
        <div className="sd-logo" style={{ fontSize: 30, textAlign: "center", marginBottom: 30 }}>
          Velvet<span>Reel</span>
        </div>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input
            type="email" required placeholder="Email" value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: 14, borderRadius: 12, border: "1px solid rgba(255,255,255,0.15)", background: "#2f1720", color: "#f3ece4", fontSize: 15 }}
          />
          <input
            type="password" required placeholder="Password" value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: 14, borderRadius: 12, border: "1px solid rgba(255,255,255,0.15)", background: "#2f1720", color: "#f3ece4", fontSize: 15 }}
          />
          {error && <div style={{ color: "#ff8a99", fontSize: 13 }}>{error}</div>}
          {notice && <div style={{ color: "#cf9d3f", fontSize: 13 }}>{notice}</div>}
          <button className="sd-btn sd-btn-primary" disabled={loading} type="submit">
            {loading ? "Please wait..." : mode === "signup" ? "Create account" : "Sign in"}
          </button>
        </form>
        <div style={{ textAlign: "center", marginTop: 16, fontSize: 13, color: "#c9b8ae" }}>
          {mode === "signup" ? (
            <>Already have an account? <span style={{ color: "#ff4d6d", cursor: "pointer" }} onClick={() => { setMode("signin"); setError(null); }}>Sign in</span></>
          ) : (
            <>New here? <span style={{ color: "#ff4d6d", cursor: "pointer" }} onClick={() => { setMode("signup"); setError(null); }}>Create an account</span></>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ShortDramaApp() {
  const [authUser, setAuthUser] = useState(null);
  const [series, setSeries] = useState(SEED_SERIES);
  const [view, setView] = useState("home"); // home | series | reader
  const [activeSeriesId, setActiveSeriesId] = useState(null);
  const [activeEpIndex, setActiveEpIndex] = useState(0);

  const [isSubscribed, setIsSubscribed] = useState(false);
  const [plan, setPlan] = useState(null); // "monthly" | "yearly"
  const [adUnlocked, setAdUnlocked] = useState({}); // { "s1-3": true }

  const [generating, setGenerating] = useState(false);
  const [genError, setGenError] = useState(null);

  const [showPaywall, setShowPaywall] = useState(false);
  const [showAdPlaying, setShowAdPlaying] = useState(false);
  const [pendingUnlockKey, setPendingUnlockKey] = useState(null);

  const readerRef = useRef(null);

  const activeSeries = series.find((s) => s.id === activeSeriesId);

  useEffect(() => {
    if (readerRef.current) readerRef.current.scrollTo(0, 0);
  }, [view, activeEpIndex]);

  function openSeries(id) {
    setActiveSeriesId(id);
    setView("series");
  }

  function openEpisode(idx) {
    setActiveEpIndex(idx);
    setView("reader");
  }

  function isEpisodeLocked(s, idx) {
    if (idx < FREE_EPISODES) return false;
    if (isSubscribed) return false;
    const key = `${s.id}-${idx}`;
    return !adUnlocked[key];
  }

  async function ensureEpisodeExists(s, idx) {
    if (s.episodes[idx]) return true;
    setGenerating(true);
    setGenError(null);
    try {
      const ep = await generateNextEpisode(s);
      setSeries((prev) =>
        prev.map((x) =>
          x.id === s.id ? { ...x, episodes: [...x.episodes, ep] } : x
        )
      );
      return true;
    } catch (err) {
      console.error(err);
      setGenError("Couldn't generate the next episode. Try again.");
      return false;
    } finally {
      setGenerating(false);
    }
  }

  async function handleNext() {
    const s = activeSeries;
    const nextIdx = activeEpIndex + 1;

    const ok = await ensureEpisodeExists(s, nextIdx);
    if (!ok) return;

    if (isEpisodeLocked(s, nextIdx)) {
      setPendingUnlockKey(`${s.id}-${nextIdx}`);
      setShowPaywall(true);
      return;
    }
    setActiveEpIndex(nextIdx);
  }

  function watchAdToUnlock() {
    setShowPaywall(false);
    setShowAdPlaying(true);
    setTimeout(() => {
      setShowAdPlaying(false);
      setAdUnlocked((prev) => ({ ...prev, [pendingUnlockKey]: true }));
      setActiveEpIndex((i) => i + 1);
    }, 2600);
  }

  function subscribeNow(selectedPlan) {
    setIsSubscribed(true);
    setPlan(selectedPlan);
    setShowPaywall(false);
    if (pendingUnlockKey) setActiveEpIndex((i) => i + 1);
  }

  if (!authUser) {
    return <AuthScreen onAuthed={(session) => setAuthUser(session)} />;
  }

  return (
    <div className="sd-root">
      <GlobalStyle />
      <div className="sd-shell">
        <TopBar isSubscribed={isSubscribed} plan={plan} onSubscribeClick={() => setShowPaywall(true) || setPendingUnlockKey(null)} />

        <div className="sd-scroll" ref={readerRef}>
          {view === "home" && (
            <HomeView series={series} onOpen={openSeries} isSubscribed={isSubscribed} />
          )}

          {view === "series" && activeSeries && (
            <SeriesView
              s={activeSeries}
              onBack={() => setView("home")}
              onOpenEpisode={openEpisode}
              isEpisodeLocked={(idx) => isEpisodeLocked(activeSeries, idx)}
            />
          )}

          {view === "reader" && activeSeries && (
            <ReaderView
              s={activeSeries}
              idx={activeEpIndex}
              onBack={() => setView("series")}
              isSubscribed={isSubscribed}
            />
          )}
        </div>

        {view === "reader" && (
          <div className="sd-nextbar">
            <button className="sd-btn sd-btn-primary" disabled={generating} onClick={handleNext}>
              {generating ? (
                <span className="sd-loading-dots">Writing next episode<span>.</span><span>.</span><span>.</span></span>
              ) : (
                <>Next Episode →</>
              )}
            </button>
          </div>
        )}
        {genError && view === "reader" && (
          <div style={{ position: "fixed", bottom: 86, left: "50%", transform: "translateX(-50%)", color: "#ff8a99", fontSize: 12 }}>
            {genError}
          </div>
        )}

        {showPaywall && (
          <PaywallModal
            onWatchAd={watchAdToUnlock}
            onSubscribe={subscribeNow}
            onClose={() => setShowPaywall(false)}
            isGenericUpsell={!pendingUnlockKey}
          />
        )}
        {showAdPlaying && <AdOverlay />}
      </div>
    </div>
  );
}

// ---------- Sub-views ----------

function TopBar({ isSubscribed, plan, onSubscribeClick }) {
  return (
    <div className="sd-topbar">
      <div className="sd-logo">
        Velvet<span>Reel</span>
      </div>
      {isSubscribed ? (
        <div className="sd-coins" style={{ color: "#cf9d3f" }}>
          ✦ VIP · {plan === "yearly" ? "Yearly" : "Monthly"}
        </div>
      ) : (
        <div className="sd-coins" onClick={onSubscribeClick} style={{ cursor: "pointer" }}>
          ✦ Go VIP
        </div>
      )}
    </div>
  );
}

function HomeView({ series, onOpen }) {
  return (
    <div>
      <div className="sd-section-title">
        <h2>Trending Now</h2>
        <small>updated today</small>
      </div>
      <div className="sd-rail">
        {series.map((s) => (
          <SeriesCard key={s.id} s={s} onClick={() => onOpen(s.id)} />
        ))}
      </div>

      <div className="sd-section-title" style={{ marginTop: 18 }}>
        <h2>For You</h2>
      </div>
      <div className="sd-grid-2">
        {series.map((s) => (
          <SeriesCard key={s.id + "-grid"} s={s} onClick={() => onOpen(s.id)} />
        ))}
      </div>
    </div>
  );
}

function SeriesCard({ s, onClick }) {
  return (
    <div className="sd-card" onClick={onClick}>
      <div className="sd-poster" style={{ background: s.grad }}>
        <div className="sd-ep-count">{s.episodes.length}+ EP</div>
        <div className="sd-title-on-card">{s.title}</div>
      </div>
      <div className="sd-genre-tag">{s.genre}</div>
    </div>
  );
}

function SeriesView({ s, onBack, onOpenEpisode, isEpisodeLocked }) {
  return (
    <div>
      <div style={{ padding: "14px 20px 0" }}>
        <button className="sd-backbtn" onClick={onBack}>← Back</button>
      </div>
      <div className="sd-series-hero">
        <div className="sd-poster" style={{ background: s.grad }} />
        <h1 className="sd-display">{s.title}</h1>
        <span className="sd-genre-tag">{s.genre}</span>
        <p className="sd-logline">{s.logline}</p>
      </div>
      <div className="sd-eplist">
        {s.episodes.map((ep, idx) => {
          const locked = isEpisodeLocked(idx);
          return (
            <div className="sd-ep-row" key={idx} onClick={() => onOpenEpisode(idx)}>
              <span className="num">{String(idx + 1).padStart(2, "0")}</span>
              <span className="t">{ep.title}</span>
              {locked ? <span className="sd-lock">🔒</span> : <span style={{ color: "#cf9d3f" }}>▶</span>}
            </div>
          );
        })}
        <div className="sd-ep-row" style={{ opacity: 0.6, cursor: "default" }}>
          <span className="num">{String(s.episodes.length + 1).padStart(2, "0")}</span>
          <span className="t">More episodes generate as you read →</span>
        </div>
      </div>
    </div>
  );
}

function ReaderView({ s, idx, isSubscribed }) {
  const ep = s.episodes[idx];
  if (!ep) return <div className="sd-empty">Episode not found.</div>;

  const paragraphs = ep.body.split(/\n\n+/);
  const showAdBanner = !isSubscribed && idx >= FREE_EPISODES - 1;

  return (
    <div className="sd-reader">
      <div className="ep-eyebrow">{s.title} · Episode {idx + 1}</div>
      <h1>{ep.title}</h1>
      {showAdBanner && (
        <div className="sd-ad-banner">
          <span><b>Sponsored</b> — Glow Skincare: your 10pm villain-era routine ✨</span>
        </div>
      )}
      {paragraphs.map((p, i) => (
        <p key={i} className={p.trim().startsWith('"') ? "dialogue" : ""}>
          {p}
        </p>
      ))}
    </div>
  );
}

function PaywallModal({ onWatchAd, onSubscribe, onClose, isGenericUpsell }) {
  return (
    <div className="sd-modal-backdrop" onClick={onClose}>
      <div className="sd-modal" onClick={(e) => e.stopPropagation()}>
        <h3 className="sd-display">
          {isGenericUpsell ? "Go VIP, unlock everything" : "This episode is locked"}
        </h3>
        <p className="sub">
          {isGenericUpsell
            ? "Unlimited episodes, zero ads, new drops first."
            : "Watch a short ad, or go VIP for unlimited access with zero ads."}
        </p>

        {!isGenericUpsell && (
          <div className="sd-option" onClick={onWatchAd}>
            <div>
              <div className="lab">▶ Watch an ad</div>
              <div className="desc">~15 seconds, unlocks this episode</div>
            </div>
            <div className="price">FREE</div>
          </div>
        )}

        <div className="sd-option" onClick={() => onSubscribe("yearly")} style={{ borderColor: "#cf9d3f", position: "relative" }}>
          <div className="sd-save-badge">BEST VALUE · SAVE 37%</div>
          <div>
            <div className="lab">✦ VelvetReel VIP — Yearly</div>
            <div className="desc">Unlimited episodes · No ads · $4.99/mo billed yearly</div>
          </div>
          <div className="price">$59.99/yr</div>
        </div>

        <div className="sd-option" onClick={() => onSubscribe("monthly")}>
          <div>
            <div className="lab">VelvetReel VIP — Monthly</div>
            <div className="desc">Unlimited episodes · No ads · Cancel anytime</div>
          </div>
          <div className="price">$7.99/mo</div>
        </div>

        <div className="sd-close" onClick={onClose}>Not now</div>
      </div>
    </div>
  );
}

function AdOverlay() {
  return (
    <div className="sd-modal-backdrop" style={{ alignItems: "center" }}>
      <div style={{ textAlign: "center", color: "#f3ece4" }}>
        <div style={{ fontSize: 13, letterSpacing: 1, color: "#cf9d3f", marginBottom: 10 }}>
          AD PLAYING
        </div>
        <div className="sd-display" style={{ fontSize: 20 }}>Glow Skincare</div>
        <div style={{ fontSize: 13, color: "#c9b8ae", marginTop: 8 }} className="sd-loading-dots">
          unlocking your episode<span>.</span><span>.</span><span>.</span>
        </div>
      </div>
    </div>
  );
}

import React, { useMemo, useState } from 'react';
import { MapPin, Compass, Route, Heart, Search, Clock3, Camera, Ghost, Trees, Landmark, Film, Skull, Mountain, PawPrint, Tent, Star, X } from 'lucide-react';

const PLACE_DATA = [
  {
    id: 0,
    name: 'Superstition Mountains Coyote/Cougar Shadow View',
    region: 'Arizona',
    routeTags: ['apache junction', 'arizona corridor'],
    vibes: ['weird', 'scenic', 'local legend', 'photo-worthy'],
    category: 'scenic overlook',
    detour: 8,
    description: 'A famous Apache Junction shadow phenomenon on the Superstitions that looks like a coyote or cougar depending on who is telling the story.',
    whyStop: 'It feels like desert folklore turning into a real visual moment when the light hits just right.',
    bestFor: 'sunset timing, local-lore lovers, quick scenic detour',
  },
  {
    id: 1,
    name: 'Salvation Mountain',
    region: 'California',
    routeTags: ['southern california', 'arizona corridor'],
    vibes: ['artsy', 'weird', 'photo-worthy', 'desert'],
    category: 'roadside oddity',
    detour: 18,
    description: 'A surreal hand-painted desert landmark with huge visual payoff.',
    whyStop: 'It turns a normal desert drive into a story you will retell later.',
    bestFor: 'sunset, photos, weird-road-trip energy',
  },
  {
    id: 2,
    name: 'Bottle Tree Ranch',
    region: 'California',
    routeTags: ['southern california', 'vegas corridor'],
    vibes: ['weird', 'vintage', 'local gem'],
    category: 'roadside oddity',
    detour: 12,
    description: 'A strange and unforgettable roadside art stop with true desert character.',
    whyStop: 'It feels discovered, not advertised.',
    bestFor: 'quick stop, photos, quirky detours',
  },
  {
    id: 3,
    name: 'Calico Ghost Town',
    region: 'California',
    routeTags: ['southern california', 'vegas corridor'],
    vibes: ['ghostly', 'history', 'old-west'],
    category: 'ghost town',
    detour: 16,
    description: 'A desert mining town with old-west energy and dramatic atmosphere.',
    whyStop: 'It scratches the ghost-town itch without needing a giant detour.',
    bestFor: 'history lovers, families, old-west photos',
  },
  {
    id: 4,
    name: 'Apache Death Cave Trailhead',
    region: 'Arizona',
    routeTags: ['arizona corridor'],
    vibes: ['spooky', 'history', 'adventure'],
    category: 'cave',
    detour: 24,
    description: 'A rugged stop tied to a haunting local legend in the Superstition Mountains.',
    whyStop: 'It blends folklore, landscape, and genuine mystery.',
    bestFor: 'hikers, ghost-story lovers, desert explorers',
  },
  {
    id: 5,
    name: 'Goldfield Ghost Town',
    region: 'Arizona',
    routeTags: ['arizona corridor'],
    vibes: ['ghostly', 'history', 'old-west'],
    category: 'ghost town',
    detour: 14,
    description: 'An easy old-west detour with dramatic scenery and ghost-town vibes.',
    whyStop: 'Low effort, high atmosphere.',
    bestFor: 'quick adventure, old-west fans',
  },
  {
    id: 6,
    name: 'Hieroglyphic Canyon Trail',
    region: 'Arizona',
    routeTags: ['arizona corridor'],
    vibes: ['hidden', 'scenic', 'history'],
    category: 'history marker',
    detour: 26,
    description: 'A desert trail with ancient rock art and a sense of finding something timeless.',
    whyStop: 'It feels like the route itself opened up a secret.',
    bestFor: 'history, photos, light adventure',
  },
  {
    id: 7,
    name: 'Pioneer Cemetery',
    region: 'Arizona',
    routeTags: ['phoenix'],
    vibes: ['spooky', 'history', 'quiet'],
    category: 'cemetery',
    detour: 9,
    description: 'A historic cemetery packed with local stories, legends, and old desert history.',
    whyStop: 'Perfect for travelers who like eerie, reflective detours.',
    bestFor: 'ghost stories, twilight visits, local lore',
  },
  {
    id: 8,
    name: 'Vulture City Ghost Town',
    region: 'Arizona',
    routeTags: ['phoenix', 'arizona corridor'],
    vibes: ['ghostly', 'history', 'spooky'],
    category: 'ghost town',
    detour: 28,
    description: 'A more atmospheric and less basic ghost-town stop with real mining history.',
    whyStop: 'It feels closer to a forgotten chapter than a theme stop.',
    bestFor: 'history buffs, ghost-story seekers, photographers',
  },
  {
    id: 9,
    name: 'Rooster Cogburn Ostrich Ranch',
    region: 'Arizona',
    routeTags: ['arizona corridor'],
    vibes: ['quirky', 'animal', 'family'],
    category: 'wildlife spot',
    detour: 11,
    description: 'A delightfully odd desert animal stop that feels very roadside-America.',
    whyStop: 'It gives the route personality.',
    bestFor: 'animal lovers, quick leg stretch, families',
  },
  {
    id: 10,
    name: 'Red Rock Canyon Overlook',
    region: 'Nevada',
    routeTags: ['vegas corridor'],
    vibes: ['scenic', 'sunset', 'photo-worthy'],
    category: 'scenic overlook',
    detour: 21,
    description: 'Huge desert visuals with a payoff that feels bigger than the effort.',
    whyStop: 'This is the kind of stop that makes people pull out a camera instantly.',
    bestFor: 'sunset, scenic reset, photos',
  },
  {
    id: 11,
    name: 'Nelson Ghost Town',
    region: 'Nevada',
    routeTags: ['vegas corridor'],
    vibes: ['ghostly', 'vintage', 'photo-worthy'],
    category: 'movie location',
    detour: 29,
    description: 'A rough-edged old mining stop with vintage props, dramatic views, and filming energy.',
    whyStop: 'It feels cinematic without feeling polished.',
    bestFor: 'photos, western vibes, movie-location lovers',
  },
  {
    id: 12,
    name: 'The Thing?',
    region: 'Arizona',
    routeTags: ['arizona corridor'],
    vibes: ['weird', 'roadside', 'campy'],
    category: 'roadside oddity',
    detour: 6,
    description: 'Classic strange-roadside-America energy with the perfect amount of mystery and silliness.',
    whyStop: 'Because every route needs at least one gloriously weird stop.',
    bestFor: 'quick stop, laughs, nostalgia',
  },
  {
    id: 13,
    name: 'Petrified Forest National Park',
    region: 'Arizona',
    routeTags: ['i-40 corridor', 'holbrook', 'arizona corridor'],
    vibes: ['scenic', 'history', 'photo-worthy', 'weird'],
    category: 'history marker',
    detour: 20,
    description: 'A surreal Arizona park where fossilized wood, painted desert views, and old Route 66 traces all collide.',
    whyStop: 'It gives you geology, color, history, and roadside-America energy in one stop.',
    bestFor: 'longer scenic break, Route 66 fans, strange-natural-history lovers',
  },
];

const vibeOptions = [
  'local legend',
  'scenic',
  'weird',
  'hidden',
  'spooky',
  'vintage',
  'photo-worthy',
  'history',
  'animal',
  'artsy',
  'ghostly',
  'roadside',
  'adventure',
];

const categories = [
  'ghost town',
  'cemetery',
  'history marker',
  'movie location',
  'wildlife spot',
  'cave',
  'roadside oddity',
  'scenic overlook',
];

const iconForCategory = {
  'ghost town': Ghost,
  cemetery: Skull,
  'history marker': Landmark,
  'movie location': Film,
  'wildlife spot': PawPrint,
  cave: Mountain,
  'roadside oddity': Compass,
  'scenic overlook': Camera,
};

function Badge({ children, active = false, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3 py-1.5 text-sm transition ${
        active
          ? 'bg-black text-white shadow'
          : 'bg-white/80 text-zinc-700 ring-1 ring-zinc-200 hover:bg-zinc-50'
      }`}
    >
      {children}
    </button>
  );
}

function SectionTitle({ icon: Icon, title, subtitle }) {
  return (
    <div className="mb-4 flex items-start gap-3">
      <div className="rounded-2xl bg-white p-2 shadow-sm ring-1 ring-zinc-200">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h2 className="text-xl font-semibold text-zinc-900">{title}</h2>
        {subtitle && <p className="text-sm text-zinc-600">{subtitle}</p>}
      </div>
    </div>
  );
}

export default function VeerMVP() {
  const [start, setStart] = useState('Los Angeles, CA');
  const [end, setEnd] = useState('Phoenix, AZ');
  const [maxDetour, setMaxDetour] = useState(20);
  const [selectedVibes, setSelectedVibes] = useState(['weird', 'scenic']);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [saved, setSaved] = useState([]);
  const [selectedStop, setSelectedStop] = useState(null);
  const [view, setView] = useState('list');

  const results = useMemo(() => {
    return PLACE_DATA.filter((place) => {
      const vibeMatch =
        selectedVibes.length === 0 || selectedVibes.some((v) => place.vibes.includes(v));
      const categoryMatch =
        selectedCategories.length === 0 || selectedCategories.includes(place.category);
      const detourMatch = place.detour <= maxDetour;
      return vibeMatch && categoryMatch && detourMatch;
    }).sort((a, b) => a.detour - b.detour);
  }, [selectedVibes, selectedCategories, maxDetour]);

  const savedStops = PLACE_DATA.filter((place) => saved.includes(place.id));

  const toggleValue = (value, list, setter) => {
    setter(list.includes(value) ? list.filter((item) => item !== value) : [...list, value]);
  };

  const toggleSave = (id) => {
    setSaved((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-100 via-orange-50 to-zinc-100 text-zinc-900">
      <div className="mx-auto max-w-7xl p-4 md:p-8">
        <div className="mb-8 overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#18181b_0%,#292524_55%,#7c2d12_100%)] p-6 text-white shadow-xl md:p-10">
          <div className="mb-8 flex flex-wrap items-start justify-between gap-6">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm backdrop-blur">
                <Route className="h-4 w-4" />
                Veer MVP
              </div>
              <h1 className="max-w-2xl text-4xl font-semibold tracking-tight md:text-6xl">
                Find the stops worth leaving the route for.
              </h1>
              <p className="mt-4 max-w-2xl text-sm text-zinc-200 md:text-base">
                Hidden gems, ghost towns, cemeteries, wildlife spots, movie locations, and the kind of
                places you would never think to search for.
              </p>
            </div>
            <div className="rounded-3xl bg-white/10 p-4 text-sm backdrop-blur md:w-72">
              <div className="mb-2 font-medium">Fast business idea</div>
              <p className="text-zinc-200">
                Launch as a curated Southwest beta first. Sell route packs while the app grows.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            <div className="rounded-3xl bg-white/10 p-4 backdrop-blur md:col-span-1">
              <label className="mb-2 block text-sm text-zinc-200">Starting point</label>
              <div className="flex items-center gap-2 rounded-2xl bg-white/10 px-3 py-3 ring-1 ring-white/10">
                <MapPin className="h-4 w-4" />
                <input
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                  className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-300"
                />
              </div>
            </div>
            <div className="rounded-3xl bg-white/10 p-4 backdrop-blur md:col-span-1">
              <label className="mb-2 block text-sm text-zinc-200">Destination</label>
              <div className="flex items-center gap-2 rounded-2xl bg-white/10 px-3 py-3 ring-1 ring-white/10">
                <MapPin className="h-4 w-4" />
                <input
                  value={end}
                  onChange={(e) => setEnd(e.target.value)}
                  className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-300"
                />
              </div>
            </div>
            <div className="rounded-3xl bg-white/10 p-4 backdrop-blur md:col-span-1">
              <label className="mb-2 block text-sm text-zinc-200">Max detour</label>
              <div className="rounded-2xl bg-white/10 p-3 ring-1 ring-white/10">
                <input
                  type="range"
                  min="5"
                  max="30"
                  step="1"
                  value={maxDetour}
                  onChange={(e) => setMaxDetour(Number(e.target.value))}
                  className="w-full"
                />
                <div className="mt-2 text-sm">Up to {maxDetour} minutes off route</div>
              </div>
            </div>
            <div className="rounded-3xl bg-white/10 p-4 backdrop-blur md:col-span-1">
              <label className="mb-2 block text-sm text-zinc-200">Mode</label>
              <div className="flex gap-2 rounded-2xl bg-white/10 p-2 ring-1 ring-white/10">
                <button
                  onClick={() => setView('list')}
                  className={`flex-1 rounded-xl px-3 py-2 text-sm ${view === 'list' ? 'bg-white text-black' : 'text-white'}`}
                >
                  List
                </button>
                <button
                  onClick={() => setView('map')}
                  className={`flex-1 rounded-xl px-3 py-2 text-sm ${view === 'map' ? 'bg-white text-black' : 'text-white'}`}
                >
                  Map
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="mb-6 rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-zinc-200">
              <SectionTitle
                icon={Search}
                title="Tune the route"
                subtitle="Pick the vibe first. That is what makes Veer different."
              />

              <div className="mb-5">
                <div className="mb-2 text-sm font-medium text-zinc-700">Vibes</div>
                <div className="flex flex-wrap gap-2">
                  {vibeOptions.map((vibe) => (
                    <Badge
                      key={vibe}
                      active={selectedVibes.includes(vibe)}
                      onClick={() => toggleValue(vibe, selectedVibes, setSelectedVibes)}
                    >
                      {vibe}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-2 text-sm font-medium text-zinc-700">Categories</div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Badge
                      key={category}
                      active={selectedCategories.includes(category)}
                      onClick={() => toggleValue(category, selectedCategories, setSelectedCategories)}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-zinc-200">
              <SectionTitle
                icon={Compass}
                title={view === 'list' ? 'Good stops on your route' : 'Map mode preview'}
                subtitle={`${results.length} stops matching ${start} → ${end}`}
              />

              {view === 'map' ? (
                <div className="rounded-[1.5rem] bg-gradient-to-br from-orange-100 via-stone-100 to-zinc-200 p-5 ring-1 ring-zinc-200">
                  <div className="mb-4 flex items-center justify-between text-sm text-zinc-600">
                    <span className="font-medium">Route preview</span>
                    <span>{start} → {end}</span>
                  </div>
                  <div className="relative h-[420px] overflow-hidden rounded-[1.5rem] bg-[radial-gradient(circle_at_20%_20%,#fff_0%,#f5f5f4_35%,#e7e5e4_100%)]">
                    <div className="absolute inset-x-8 top-12 h-1 rounded-full bg-zinc-300" />
                    <div className="absolute inset-x-8 top-12 h-1 w-[72%] rounded-full bg-black" />
                    {results.slice(0, 8).map((place, index) => (
                      <button
                        key={place.id}
                        onClick={() => setSelectedStop(place)}
                        className="absolute -translate-x-1/2 -translate-y-1/2"
                        style={{ left: `${12 + index * 10}%`, top: `${20 + ((index % 4) * 18)}%` }}
                      >
                        <div className="rounded-full bg-black p-2 text-white shadow-lg">
                          <MapPin className="h-4 w-4" />
                        </div>
                      </button>
                    ))}
                    <div className="absolute bottom-4 left-4 rounded-2xl bg-white/90 p-3 text-sm shadow ring-1 ring-zinc-200 backdrop-blur">
                      Tap a pin to preview the stop.
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid gap-4">
                  {results.map((place) => {
                    const Icon = iconForCategory[place.category] || Tent;
                    const isSaved = saved.includes(place.id);
                    return (
                      <div
                        key={place.id}
                        className="rounded-[1.5rem] border border-zinc-200 bg-gradient-to-r from-white to-stone-50 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                      >
                        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                          <div className="flex gap-3">
                            <div className="rounded-2xl bg-zinc-900 p-3 text-white">
                              <Icon className="h-5 w-5" />
                            </div>
                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                <h3 className="text-lg font-semibold">{place.name}</h3>
                                <span className="rounded-full bg-zinc-100 px-2 py-1 text-xs text-zinc-600">
                                  {place.category}
                                </span>
                              </div>
                              <p className="mt-1 text-sm text-zinc-600">{place.description}</p>
                              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-zinc-600">
                                <span className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2 py-1 text-orange-900">
                                  <Clock3 className="h-3.5 w-3.5" /> {place.detour} min detour
                                </span>
                                {place.vibes.map((vibe) => (
                                  <span key={vibe} className="rounded-full bg-zinc-100 px-2 py-1">
                                    {vibe}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-2 md:flex-col">
                            <button
                              onClick={() => setSelectedStop(place)}
                              className="rounded-xl bg-black px-4 py-2 text-sm text-white shadow hover:bg-zinc-800"
                            >
                              View stop
                            </button>
                            <button
                              onClick={() => toggleSave(place.id)}
                              className={`rounded-xl px-4 py-2 text-sm ring-1 ${
                                isSaved
                                  ? 'bg-rose-50 text-rose-700 ring-rose-200'
                                  : 'bg-white text-zinc-700 ring-zinc-200'
                              }`}
                            >
                              {isSaved ? 'Saved' : 'Save'}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-zinc-200">
              <SectionTitle
                icon={Heart}
                title="Saved trip"
                subtitle="Stops you are building into the route."
              />
              {savedStops.length === 0 ? (
                <div className="rounded-[1.5rem] border border-dashed border-zinc-300 bg-zinc-50 p-6 text-sm text-zinc-500">
                  Save a few stops and this becomes your trip board.
                </div>
              ) : (
                <div className="space-y-3">
                  {savedStops.map((place) => (
                    <div key={place.id} className="rounded-[1.25rem] bg-stone-50 p-4 ring-1 ring-zinc-200">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="font-medium">{place.name}</div>
                          <div className="mt-1 text-sm text-zinc-600">{place.description}</div>
                          <div className="mt-2 text-xs text-zinc-500">{place.detour} min detour</div>
                        </div>
                        <button onClick={() => toggleSave(place.id)} className="text-zinc-500 hover:text-zinc-900">
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                  <button className="w-full rounded-2xl bg-black px-4 py-3 text-sm text-white shadow hover:bg-zinc-800">
                    Share trip
                  </button>
                </div>
              )}
            </div>

            <div className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-zinc-200">
              <SectionTitle
                icon={Star}
                title="Best first categories"
                subtitle="These are the ones that make Veer feel different right away."
              />
              <div className="grid grid-cols-2 gap-3 text-sm">
                {[
                  'ghost towns',
                  'historic cemeteries',
                  'history markers',
                  'movie locations',
                  'wildlife/reptile spots',
                  'caves',
                  'roadside oddities',
                  'scenic overlooks',
                  'haunted legends',
                  'small-town main streets',
                  'abandoned-feeling places',
                  'local diners with lore',
                ].map((item) => (
                  <div key={item} className="rounded-2xl bg-zinc-50 px-3 py-3 ring-1 ring-zinc-200">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] bg-[linear-gradient(135deg,#fafaf9_0%,#fff7ed_100%)] p-5 shadow-sm ring-1 ring-zinc-200">
              <SectionTitle
                icon={Trees}
                title="Founder notes"
                subtitle="How to make this a real business."
              />
              <div className="space-y-3 text-sm text-zinc-700">
                <p>Start with one region, not the whole country.</p>
                <p>Sell curated route packs while building the app.</p>
                <p>Your moat is the database and tagging, not just the map.</p>
                <p>Charge for advanced filters, unlimited routes, and curated collections.</p>
              </div>
            </div>
          </div>
        </div>

        {selectedStop && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-3 md:items-center">
            <div className="max-h-[90vh] w-full max-w-2xl overflow-auto rounded-[2rem] bg-white p-6 shadow-2xl">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <div className="mb-2 inline-flex rounded-full bg-zinc-100 px-2.5 py-1 text-xs text-zinc-600">
                    {selectedStop.category}
                  </div>
                  <h3 className="text-2xl font-semibold">{selectedStop.name}</h3>
                  <p className="mt-2 text-zinc-600">{selectedStop.description}</p>
                </div>
                <button onClick={() => setSelectedStop(null)} className="rounded-full bg-zinc-100 p-2 text-zinc-700">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-[1.5rem] bg-stone-50 p-4 ring-1 ring-zinc-200">
                  <div className="mb-2 text-sm font-medium">Why stop here</div>
                  <p className="text-sm text-zinc-700">{selectedStop.whyStop}</p>
                </div>
                <div className="rounded-[1.5rem] bg-stone-50 p-4 ring-1 ring-zinc-200">
                  <div className="mb-2 text-sm font-medium">Best for</div>
                  <p className="text-sm text-zinc-700">{selectedStop.bestFor}</p>
                </div>
                <div className="rounded-[1.5rem] bg-stone-50 p-4 ring-1 ring-zinc-200">
                  <div className="mb-2 text-sm font-medium">Detour</div>
                  <p className="text-sm text-zinc-700">{selectedStop.detour} minutes off route</p>
                </div>
                <div className="rounded-[1.5rem] bg-stone-50 p-4 ring-1 ring-zinc-200">
                  <div className="mb-2 text-sm font-medium">Vibes</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedStop.vibes.map((vibe) => (
                      <span key={vibe} className="rounded-full bg-white px-2 py-1 text-xs ring-1 ring-zinc-200">
                        {vibe}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => toggleSave(selectedStop.id)}
                  className="rounded-2xl bg-black px-4 py-3 text-sm text-white shadow hover:bg-zinc-800"
                >
                  {saved.includes(selectedStop.id) ? 'Saved to trip' : 'Add to trip'}
                </button>
                <button className="rounded-2xl bg-zinc-100 px-4 py-3 text-sm text-zinc-700 ring-1 ring-zinc-200">
                  Open in maps
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

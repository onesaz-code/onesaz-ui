import type { Meta, StoryObj } from '@storybook/react'
import {
  Box,
  VStack,
  HStack,
  Grid,
  Button,
  IconButton,
  Badge,
  Chip,
  Avatar,
  AvatarGroup,
  Input,
  Separator,
  Typography,
  LinearProgress,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Tooltip,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@onesaz/ui'

/**
 * Examples / Video Streaming
 * --------------------------------------------------------------------------
 * A Netflix/YouTube-style streaming UI built entirely on @onesaz/ui, used to
 * dogfood the component library. See the bottom of this file for the running
 * FINDINGS log: every place the library forced a raw className / inline-style
 * workaround, with the missing affordance noted.
 */

const meta: Meta = {
  title: 'Examples/Video Streaming',
  parameters: { layout: 'fullscreen' },
}
export default meta
type Story = StoryObj

// ============================================================================
// Inline SVG icons (library ships no icon set)
// ============================================================================

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full"><path d="M8 5v14l11-7z" /></svg>
)
const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-full w-full"><path d="M12 5v14M5 12h14" /></svg>
)
const InfoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></svg>
)
const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
)
const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3"><path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
)
const BellIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
)
const ChevronDown = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="m6 9 6 6 6-6" /></svg>
)
const ThumbsUp = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full"><path d="M7 10v12M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" /></svg>
)

// ============================================================================
// Static made-up data
// ============================================================================

type Title = {
  id: string
  title: string
  year: number
  rating: string
  meta: string
  score: number
  gradient: string
  progress?: number
}

// Distinct poster gradients (library Box.bg only accepts semantic tokens, so
// poster art is faked with CSS gradients — see FINDINGS #1/#8).
const grad = (a: string, b: string) => `linear-gradient(135deg, ${a} 0%, ${b} 100%)`

const trending: Title[] = [
  { id: 't1', title: 'Nebula Drift', year: 2026, rating: 'TV-MA', meta: '2h 14m', score: 96, gradient: grad('#4f46e5', '#0ea5e9') },
  { id: 't2', title: 'The Glasshouse', year: 2025, rating: 'TV-14', meta: 'S3 · 8 ep', score: 91, gradient: grad('#db2777', '#7c3aed') },
  { id: 't3', title: 'Ironwood', year: 2026, rating: 'R', meta: '1h 58m', score: 88, gradient: grad('#ea580c', '#b91c1c') },
  { id: 't4', title: 'Midnight Cartography', year: 2024, rating: 'TV-MA', meta: 'S2 · 10 ep', score: 84, gradient: grad('#059669', '#065f46') },
  { id: 't5', title: 'Paper Cities', year: 2026, rating: 'PG-13', meta: '2h 06m', score: 79, gradient: grad('#0891b2', '#1e3a8a') },
  { id: 't6', title: 'Salt & Static', year: 2025, rating: 'TV-14', meta: 'S1 · 6 ep', score: 92, gradient: grad('#7c3aed', '#2563eb') },
]

const continueWatching: Title[] = [
  { id: 'c1', title: 'The Glasshouse', year: 2025, rating: 'TV-14', meta: 'S3:E4', score: 91, gradient: grad('#db2777', '#7c3aed'), progress: 62 },
  { id: 'c2', title: 'Ironwood', year: 2026, rating: 'R', meta: '1h 58m', score: 88, gradient: grad('#ea580c', '#b91c1c'), progress: 30 },
  { id: 'c3', title: 'Deep Field', year: 2024, rating: 'TV-MA', meta: 'S1:E7', score: 86, gradient: grad('#0d9488', '#155e75'), progress: 88 },
  { id: 'c4', title: 'Lantern Bay', year: 2025, rating: 'TV-PG', meta: 'S2:E1', score: 74, gradient: grad('#ca8a04', '#a16207'), progress: 12 },
  { id: 'c5', title: 'Paper Cities', year: 2026, rating: 'PG-13', meta: '2h 06m', score: 79, gradient: grad('#0891b2', '#1e3a8a'), progress: 45 },
]

const newReleases: Title[] = [
  { id: 'n1', title: 'Vellum', year: 2026, rating: 'TV-MA', meta: 'New series', score: 90, gradient: grad('#be123c', '#831843') },
  { id: 'n2', title: 'Cold Harbor', year: 2026, rating: 'R', meta: '2h 22m', score: 82, gradient: grad('#334155', '#0f172a') },
  { id: 'n3', title: 'Wildflower Highway', year: 2026, rating: 'PG', meta: '1h 41m', score: 77, gradient: grad('#16a34a', '#4d7c0f') },
  { id: 'n4', title: 'The Ninth Signal', year: 2026, rating: 'TV-14', meta: 'S1 · 8 ep', score: 85, gradient: grad('#9333ea', '#4c1d95') },
  { id: 'n5', title: 'Aurora Sound', year: 2026, rating: 'TV-PG', meta: '1h 33m', score: 71, gradient: grad('#2563eb', '#0ea5e9') },
  { id: 'n6', title: 'Redwood Down', year: 2026, rating: 'R', meta: '2h 09m', score: 80, gradient: grad('#b45309', '#78350f') },
]

const categories = ['Home', 'Series', 'Films', 'New & Popular', 'My List']

// ============================================================================
// Shared building blocks
// ============================================================================

/** A rating pill: Badge with a star icon. Badge accepts children + icon fine. */
const ScoreBadge = ({ score }: { score: number }) => (
  <Badge
    color={score >= 85 ? 'success' : score >= 75 ? 'warning' : 'normal'}
    variant="soft"
  >
    <HStack gap={1} alignItems="center">
      <StarIcon />
      {score}%
    </HStack>
  </Badge>
)

/**
 * Poster tile with hover overlay.
 * FINDINGS touched: no AspectRatio component (#2), no custom Box bg (#1),
 * no Card media slot (#5), no built-in hover overlay (#3), no fixed px width
 * on Box (#4).
 */
const PosterCard = ({ t, width = 168 }: { t: Title; width?: number }) => (
  // `group` + `shrink-0` are raw classes (no prop equivalent). width is inline.
  <Box className="group shrink-0" style={{ width }}>
    <Box
      position="relative"
      rounded="lg"
      overflow="hidden"
      // aspectRatio + gradient art: inline style, no Box prop covers these.
      style={{ aspectRatio: '2 / 3', backgroundImage: t.gradient }}
    >
      {/* rating pill, top-right */}
      <Box position="absolute" style={{ top: 8, right: 8 }}>
        <ScoreBadge score={t.score} />
      </Box>

      {/* hover overlay — opacity/group-hover has no inline-style equivalent */}
      <Box
        position="absolute"
        p={3}
        className="inset-0 flex flex-col justify-end bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100"
      >
        <HStack gap={2} alignItems="center">
          <IconButton aria-label="Play" size="sm" rounded className="bg-white text-black hover:bg-white/90">
            <Box style={{ width: 14, height: 14 }}><PlayIcon /></Box>
          </IconButton>
          <IconButton aria-label="Add to list" size="sm" rounded variant="outlined" className="border-white/70 text-white hover:bg-white/10">
            <Box style={{ width: 14, height: 14 }}><PlusIcon /></Box>
          </IconButton>
        </HStack>
      </Box>

      {/* progress bar for continue-watching */}
      {t.progress !== undefined && (
        <Box position="absolute" px={2} className="inset-x-0 bottom-0 pb-2">
          <LinearProgress value={t.progress} variant="error" size="sm" />
        </Box>
      )}
    </Box>

    <VStack gap={0} className="mt-2">
      <Typography variant="subtitle2" noWrap>{t.title}</Typography>
      <HStack gap={2} alignItems="center">
        <Typography variant="caption" color="muted">{t.year}</Typography>
        <Badge color="normal" variant="outlined">{t.rating}</Badge>
        <Typography variant="caption" color="muted" noWrap>{t.meta}</Typography>
      </HStack>
    </VStack>
  </Box>
)

/**
 * A horizontal scrolling content row.
 * Box `overflow="auto"` (a real prop) gives the scroll; only the scrollbar-hide
 * utility is a raw class (#6). Cards keep width via shrink-0 (inside PosterCard).
 */
const ContentRow = ({ title, items }: { title: string; items: Title[] }) => (
  <VStack gap={3} className="mt-8">
    <HStack justifyContent="between" alignItems="center" className="px-6">
      <Typography variant="h5" fontWeight="semibold">{title}</Typography>
      <Button variant="link" size="sm" endIcon={<ChevronDown />}>See all</Button>
    </HStack>
    <Box overflow="auto" px={6} className="[scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <HStack gap={3}>
        {items.map((t) => <PosterCard key={t.id} t={t} />)}
      </HStack>
    </Box>
  </VStack>
)

/** Top navigation bar shared by both stories. */
const TopNav = () => (
  <Box
    position="sticky"
    px={6}
    py={3}
    bg="background"
    className="top-0 z-20 border-b border-border/60 backdrop-blur"
  >
    <HStack justifyContent="between" alignItems="center" gap={6}>
      <HStack gap={6} alignItems="center">
        <Typography variant="h4" fontWeight="bold" className="tracking-tight text-error-500">
          ONEFLIX
        </Typography>
        <HStack gap={1} alignItems="center" className="hidden md:flex">
          {categories.map((c, i) => (
            <Button key={c} variant={i === 0 ? 'secondary' : 'ghost'} size="sm">{c}</Button>
          ))}
        </HStack>
      </HStack>
      <HStack gap={2} alignItems="center">
        <Box className="hidden sm:block" style={{ width: 220 }}>
          <Input inputSize="sm" placeholder="Search titles, people…" startAdornment={<SearchIcon />} />
        </Box>
        <IconButton aria-label="Notifications" variant="ghost"><BellIcon /></IconButton>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <Avatar size="sm" fallback="Riya Kapoor" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Account</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </HStack>
    </HStack>
  </Box>
)

const genres = ['Sci-Fi', 'Thriller', 'Drama', 'Mystery']

/**
 * Hero banner. Gradient art + dark scrim overlay have no library affordance
 * (#8) — done with inline gradients + a scrim Box with a raw class.
 */
const Hero = ({ t, tall = false }: { t: Title; tall?: boolean }) => (
  <Box
    position="relative"
    overflow="hidden"
    style={{ minHeight: tall ? 520 : 460, backgroundImage: t.gradient }}
  >
    {/* left-to-right + bottom scrim so text stays legible over the art */}
    <Box
      position="absolute"
      className="inset-0"
      style={{
        background:
          'linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0) 75%), linear-gradient(0deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 55%)',
      }}
    />
    <Box position="relative" px={6} py={10} className="flex h-full flex-col justify-end" style={{ minHeight: tall ? 520 : 460 }}>
      <VStack gap={4} className="max-w-xl">
        <Chip label="#1 in Series Today" color="error" size="small" />
        <Typography as="h1" variant="h1" color="white" className="text-4xl sm:text-5xl font-extrabold drop-shadow">
          {t.title}
        </Typography>
        <HStack gap={2} alignItems="center" wrap="wrap">
          <Typography variant="body2" className="font-semibold text-emerald-400">{t.score}% Match</Typography>
          <Typography variant="body2" className="text-white/90">{t.year}</Typography>
          <Badge color="normal" variant="outlined" className="text-white border-white/50">{t.rating}</Badge>
          <Typography variant="body2" className="text-white/90">{t.meta}</Typography>
        </HStack>
        <HStack gap={2} wrap="wrap">
          {genres.map((g) => (
            <Badge key={g} color="normal" variant="soft" className="bg-white/15 text-white">{g}</Badge>
          ))}
        </HStack>
        {/* line-clamp-3: Typography has no maxLines prop (#7) */}
        <Typography variant="body1" className="text-white/85 line-clamp-3">
          When a deep-space survey crew loses contact with Earth, cartographer Mara Vance must map an
          impossible drift of stars to find a way home — before the ship's failing systems rewrite the
          route beneath them. A tense, character-driven odyssey across the edge of the known galaxy.
        </Typography>
        <HStack gap={3} alignItems="center" className="mt-2">
          <Button size="lg" startIcon={<Box style={{ width: 20, height: 20 }}><PlayIcon /></Box>} className="bg-white text-black hover:bg-white/90">
            Play
          </Button>
          <Button size="lg" variant="secondary" startIcon={<Box style={{ width: 20, height: 20 }}><InfoIcon /></Box>} className="bg-white/20 text-white hover:bg-white/30">
            More Info
          </Button>
          <IconButton aria-label="Add to My List" variant="outlined" rounded className="border-white/70 text-white hover:bg-white/10">
            <Box style={{ width: 18, height: 18 }}><PlusIcon /></Box>
          </IconButton>
        </HStack>
      </VStack>
    </Box>
  </Box>
)

// ============================================================================
// Story 1: BrowseHome
// ============================================================================

export const BrowseHome: Story = {
  render: () => (
    <Box bg="background" className="min-h-screen text-foreground">
      <TopNav />
      <Hero t={trending[0]} />
      <Box className="pb-12">
        <ContentRow title="Trending now" items={trending} />
        <ContinueWatchingRow />
        <ContentRow title="New releases" items={newReleases} />
      </Box>
    </Box>
  ),
}

const ContinueWatchingRow = () => (
  <VStack gap={3} className="mt-8">
    <HStack justifyContent="between" alignItems="center" className="px-6">
      <Typography variant="h5" fontWeight="semibold">Continue watching for Riya</Typography>
      <Button variant="link" size="sm" endIcon={<ChevronDown />}>See all</Button>
    </HStack>
    <Box overflow="auto" px={6} className="[scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <HStack gap={3}>
        {continueWatching.map((t) => <PosterCard key={t.id} t={t} width={200} />)}
      </HStack>
    </Box>
  </VStack>
)

// ============================================================================
// Story 2: TitleDetail
// ============================================================================

const cast = [
  { name: 'Mara Vance', src: '' },
  { name: 'Elian Cho', src: '' },
  { name: 'Priya Nair', src: '' },
  { name: 'Tomas Reyes', src: '' },
  { name: 'Ingrid Solberg', src: '' },
  { name: 'Dev Anand', src: '' },
]

const episodes = [
  { n: 1, title: 'The Last Transmission', dur: '58m', desc: 'A routine survey turns catastrophic when Earth goes silent.', gradient: grad('#1e3a8a', '#0ea5e9') },
  { n: 2, title: 'Dead Reckoning', dur: '52m', desc: 'Mara improvises a star map from failing instruments.', gradient: grad('#3730a3', '#6d28d9') },
  { n: 3, title: 'The Drift', dur: '61m', desc: 'The crew discovers the stars are not where they should be.', gradient: grad('#0f766e', '#155e75') },
  { n: 4, title: 'Paper Coordinates', dur: '49m', desc: 'A hidden log suggests they are not the first crew to be lost here.', gradient: grad('#9d174d', '#7c3aed') },
]

const feature = trending[0]

export const TitleDetail: Story = {
  render: () => (
    <Box bg="background" className="min-h-screen text-foreground">
      <TopNav />
      <Hero t={feature} tall />

      <Box px={6} py={8}>
        <Grid columns={{ default: 1, lg: 3 }} gap={8}>
          {/* main column */}
          <Grid item lg={2}>
            <VStack gap={6}>
              {/* metadata + actions */}
              <VStack gap={4}>
                <HStack gap={2} alignItems="center" wrap="wrap">
                  <Typography variant="body2" className="font-semibold text-emerald-500">{feature.score}% Match</Typography>
                  <Typography variant="body2" color="muted">{feature.year}</Typography>
                  <Badge color="normal" variant="outlined">{feature.rating}</Badge>
                  <Typography variant="body2" color="muted">{feature.meta}</Typography>
                  <Badge color="info" variant="soft">HD</Badge>
                  <Badge color="info" variant="soft">5.1</Badge>
                </HStack>
                <HStack gap={2} wrap="wrap">
                  {genres.map((g) => <Chip key={g} label={g} variant="outlined" size="small" />)}
                </HStack>
                <HStack gap={3} alignItems="center">
                  <Button startIcon={<Box style={{ width: 18, height: 18 }}><PlayIcon /></Box>}>Play</Button>
                  <Button variant="outlined" startIcon={<Box style={{ width: 18, height: 18 }}><PlusIcon /></Box>}>My List</Button>
                  <Tooltip content="Rate this title">
                    <IconButton aria-label="Rate" variant="outlined" rounded>
                      <Box style={{ width: 18, height: 18 }}><ThumbsUp /></Box>
                    </IconButton>
                  </Tooltip>
                </HStack>
                <Typography variant="body1" color="muted">
                  When a deep-space survey crew loses contact with Earth, cartographer Mara Vance must
                  map an impossible drift of stars to find a way home. Across eight episodes, the crew
                  confronts the limits of trust, memory, and the maps we draw to make sense of the dark.
                </Typography>
              </VStack>

              <Separator />

              {/* cast */}
              <VStack gap={3}>
                <Typography variant="h5" fontWeight="semibold">Cast</Typography>
                <HStack gap={3} alignItems="center">
                  <AvatarGroup max={5} size="md">
                    {cast.map((c) => <Avatar key={c.name} fallback={c.name} src={c.src} />)}
                  </AvatarGroup>
                  <Typography variant="body2" color="muted">+ more</Typography>
                </HStack>
              </VStack>

              <Separator />

              {/* episodes */}
              <VStack gap={4}>
                <HStack justifyContent="between" alignItems="center">
                  <Typography variant="h5" fontWeight="semibold">Episodes</Typography>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outlined" size="sm" endIcon={<ChevronDown />}>Season 1</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Season 1</DropdownMenuItem>
                      <DropdownMenuItem>Season 2</DropdownMenuItem>
                      <DropdownMenuItem>Season 3</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </HStack>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead style={{ width: 56 }}>#</TableHead>
                      <TableHead>Episode</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead className="text-right">Watch</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {episodes.map((ep) => (
                      <TableRow key={ep.n}>
                        <TableCell className="font-semibold text-muted-foreground">{ep.n}</TableCell>
                        <TableCell>
                          <HStack gap={3} alignItems="center">
                            <Box
                              rounded="md"
                              className="shrink-0"
                              style={{ width: 96, aspectRatio: '16 / 9', backgroundImage: ep.gradient }}
                            />
                            <VStack gap={1}>
                              <Typography variant="subtitle2">{ep.title}</Typography>
                              <Typography variant="caption" color="muted" className="line-clamp-1">{ep.desc}</Typography>
                            </VStack>
                          </HStack>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{ep.dur}</TableCell>
                        <TableCell className="text-right">
                          <IconButton aria-label={`Play episode ${ep.n}`} size="sm" rounded variant="ghost">
                            <Box style={{ width: 16, height: 16 }}><PlayIcon /></Box>
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </VStack>
            </VStack>
          </Grid>

          {/* sidebar column */}
          <Grid item lg={1}>
            <VStack gap={4}>
              <Typography variant="h5" fontWeight="semibold">Details</Typography>
              <VStack gap={2}>
                <MetaRow label="Director" value="A. Fernandes" />
                <MetaRow label="Studio" value="Meridian Pictures" />
                <MetaRow label="Release" value="March 2026" />
                <MetaRow label="Languages" value="EN, ES, HI, JA" />
              </VStack>
            </VStack>
          </Grid>
        </Grid>

        {/* more like this */}
        <VStack gap={4} className="mt-10">
          <Typography variant="h5" fontWeight="semibold">More like this</Typography>
          <Grid columns={{ default: 2, sm: 3, md: 4, lg: 6 }} gap={4}>
            {[...newReleases, ...trending].slice(0, 12).map((t) => (
              <Box key={t.id} className="group">
                <Box
                  position="relative"
                  rounded="lg"
                  overflow="hidden"
                  style={{ aspectRatio: '2 / 3', backgroundImage: t.gradient }}
                >
                  <Box position="absolute" style={{ top: 8, right: 8 }}>
                    <ScoreBadge score={t.score} />
                  </Box>
                  <Box
                    position="absolute"
                    className="inset-0 flex items-end p-3 bg-gradient-to-t from-black/85 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <Typography variant="caption" color="white" fontWeight="semibold">{t.title}</Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </Grid>
        </VStack>
      </Box>
    </Box>
  ),
}

const MetaRow = ({ label, value }: { label: string; value: string }) => (
  <HStack justifyContent="between" alignItems="center" className="py-2 border-b border-border/60">
    <Typography variant="body2" color="muted">{label}</Typography>
    <Typography variant="body2" fontWeight="medium">{value}</Typography>
  </HStack>
)

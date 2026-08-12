import type { Meta, StoryObj } from '@storybook/react'
import {
  Box,
  HStack,
  VStack,
  Grid,
  Card,
  CardContent,
  Button,
  IconButton,
  Badge,
  Avatar,
  Input,
  Textarea,
  Separator,
  Typography,
  Tooltip,
} from '@onesaz/ui'

const meta: Meta = {
  title: 'Examples/Social Feed',
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj

// ============================================================================
// Icons (inline SVG, 24x24, stroke=currentColor)
// ============================================================================

const SearchIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
  </svg>
)
const HomeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><path d="M9 22V12h6v10" />
  </svg>
)
const BellIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
)
const MailIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)
const BookmarkIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
)
const UserIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
)
const HeartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z" />
  </svg>
)
const CommentIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
)
const ShareIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
    <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" /><line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
  </svg>
)
const RepostIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m17 2 4 4-4 4" /><path d="M3 11v-1a4 4 0 0 1 4-4h14" /><path d="m7 22-4-4 4-4" /><path d="M21 13v1a4 4 0 0 1-4 4H3" />
  </svg>
)
const MoreIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" />
  </svg>
)
const ImageIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.09-3.09a2 2 0 0 0-2.82 0L6 21" />
  </svg>
)
const CalendarIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 2v4" /><path d="M16 2v4" /><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M3 10h18" />
  </svg>
)
const TrendUpIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" />
  </svg>
)
const VerifiedIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-accent">
    <path d="M12 2 4 5v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V5l-8-3z" opacity="0" />
    <path d="m9 11 2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.15" />
    <path d="m8.5 12 2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

// ============================================================================
// Static data
// ============================================================================

const posts = [
  {
    name: 'Ada Lovelace',
    handle: '@ada',
    time: '2h',
    verified: true,
    avatar: 'https://i.pravatar.cc/100?img=5',
    text: 'Just shipped the analytical engine notes v2. The machine can be programmed with loops and conditional branches. This changes everything about how we think about computation.',
    image: true,
    likes: 1284,
    comments: 92,
    shares: 341,
    liked: true,
  },
  {
    name: 'Grace Hopper',
    handle: '@amazinggrace',
    time: '4h',
    verified: true,
    avatar: 'https://i.pravatar.cc/100?img=9',
    text: 'Found an actual moth in the relay today. Taped it to the logbook. "First actual case of bug being found." Debugging will never be the same.',
    image: false,
    likes: 5620,
    comments: 410,
    shares: 1203,
    liked: false,
  },
  {
    name: 'Alan Turing',
    handle: '@alanturing',
    time: '6h',
    verified: false,
    avatar: 'https://i.pravatar.cc/100?img=12',
    text: 'A question worth asking: can machines think? Building a test to find out. Thread below.',
    image: true,
    likes: 8901,
    comments: 1502,
    shares: 3400,
    liked: false,
  },
]

const trends = [
  { category: 'Technology · Trending', topic: '#WebAssembly', posts: '48.2K posts' },
  { category: 'Programming', topic: '#RustLang', posts: '31.9K posts' },
  { category: 'Design · Trending', topic: 'Design Systems', posts: '22.1K posts' },
  { category: 'Science', topic: '#QuantumComputing', posts: '18.7K posts' },
  { category: 'Trending in Tech', topic: 'TypeScript 6.0', posts: '12.4K posts' },
]

const suggestions = [
  { name: 'Margaret Hamilton', handle: '@margaret', avatar: 'https://i.pravatar.cc/100?img=1' },
  { name: 'Katherine Johnson', handle: '@katherinej', avatar: 'https://i.pravatar.cc/100?img=20' },
  { name: 'Hedy Lamarr', handle: '@hedy', avatar: 'https://i.pravatar.cc/100?img=16' },
]

const navItems = [
  { icon: <HomeIcon />, label: 'Home', active: true },
  { icon: <SearchIcon />, label: 'Explore', active: false },
  { icon: <BellIcon />, label: 'Notifications', active: false, count: 3 },
  { icon: <MailIcon />, label: 'Messages', active: false },
  { icon: <BookmarkIcon />, label: 'Bookmarks', active: false },
  { icon: <UserIcon />, label: 'Profile', active: false },
]

function formatCount(n: number) {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
  return String(n)
}

// ============================================================================
// Action button with count (like/comment/share row)
// ============================================================================

function PostAction({
  icon,
  count,
  active,
  activeColor,
  label,
}: {
  icon: React.ReactNode
  count: number
  active?: boolean
  activeColor?: string
  label: string
}) {
  // FINDING: No "icon + count" action-row component/pattern. Built by hand with a
  // raw <button> + Tailwind because IconButton is a fixed square (h-x w-x) and
  // can't hold an adjacent count label, and Button forces a min height/padding
  // that's too heavy for a compact social action row.
  return (
    <button
      type="button"
      aria-label={label}
      className={`group inline-flex items-center gap-1.5 text-sm transition-colors ${
        active ? activeColor : 'text-muted-foreground hover:text-accent'
      }`}
    >
      <span className="[&>svg]:h-[18px] [&>svg]:w-[18px]">{icon}</span>
      <span className="tabular-nums">{formatCount(count)}</span>
    </button>
  )
}

// ============================================================================
// Feed post card
// ============================================================================

function FeedPost({ post }: { post: (typeof posts)[number] }) {
  return (
    <Card>
      <CardContent className="p-4">
        <HStack gap={3} alignItems="start">
          <Avatar src={post.avatar} alt={post.name} fallback={post.name} size="md" />
          <VStack gap={2} className="min-w-0 flex-1">
            {/* Header row */}
            <HStack justifyContent="between" alignItems="start">
              <HStack gap={1} alignItems="center" className="min-w-0 flex-wrap">
                <Typography variant="body2" fontWeight="bold" className="truncate">
                  {post.name}
                </Typography>
                {post.verified && <VerifiedIcon />}
                <Typography variant="body2" color="muted" className="truncate">
                  {post.handle}
                </Typography>
                <Typography variant="body2" color="muted">
                  · {post.time}
                </Typography>
              </HStack>
              <IconButton aria-label="More options" variant="ghost" size="sm" rounded className="-mr-2 -mt-1 text-muted-foreground">
                <MoreIcon />
              </IconButton>
            </HStack>

            {/* Body text */}
            <Typography variant="body2" className="whitespace-pre-wrap leading-relaxed">
              {post.text}
            </Typography>

            {/* Image placeholder */}
            {post.image && (
              // FINDING: No AspectRatio / media-placeholder component, so the 16:9
              // image frame is a raw div with aspect-video + bg utilities.
              <Box
                border
                borderColor="border"
                rounded="xl"
                overflow="hidden"
                className="aspect-video w-full bg-muted text-muted-foreground flex items-center justify-center"
              >
                <span className="[&>svg]:h-10 [&>svg]:w-10 opacity-40">
                  <ImageIcon />
                </span>
              </Box>
            )}

            {/* Action row */}
            <HStack justifyContent="between" className="mt-1 max-w-md">
              <PostAction icon={<CommentIcon />} count={post.comments} label="Comment" />
              <PostAction
                icon={<RepostIcon />}
                count={post.shares}
                label="Repost"
                active={false}
                activeColor="text-success-600"
              />
              <PostAction
                icon={<HeartIcon />}
                count={post.likes}
                label="Like"
                active={post.liked}
                activeColor="text-error-500"
              />
              <PostAction icon={<ShareIcon />} count={0} label="Share" />
            </HStack>
          </VStack>
        </HStack>
      </CardContent>
    </Card>
  )
}

// ============================================================================
// The full screen
// ============================================================================

function SocialFeed() {
  return (
    <Box bg="background" className="min-h-screen text-foreground">
      {/* Top nav bar */}
      <Box
        as="header"
        position="sticky"
        bg="card"
        border
        borderColor="border"
        // FINDING: No sticky-topbar affordance for top:0/z-index; had to add
        // raw `top-0 z-30 border-b` because Box has no `top`, `zIndex`, or
        // per-side border props (only the all-around `border` boolean).
        className="top-0 z-30 border-x-0 border-t-0"
      >
        <HStack
          alignItems="center"
          justifyContent="between"
          // FINDING: No Container/maxWidth component; used mx-auto max-w-* by hand
          // to constrain and center the page shell (repeated below). Also HStack
          // has no padding props (px/py) — those live only on Box — so horizontal
          // padding falls back to className too.
          className="mx-auto h-14 w-full max-w-6xl gap-4 px-4"
        >
          <HStack alignItems="center" gap={2} className="shrink-0">
            <Box
              w="fit"
              className="grid h-9 w-9 place-items-center rounded-full bg-accent text-accent-foreground font-bold"
            >
              O
            </Box>
            <Typography variant="h6" fontWeight="bold" className="hidden sm:block">
              Onegram
            </Typography>
          </HStack>

          {/* Search */}
          <Box className="w-full max-w-sm">
            <Input
              placeholder="Search Onegram"
              inputSize="sm"
              startAdornment={
                <span className="[&>svg]:h-4 [&>svg]:w-4">
                  <SearchIcon />
                </span>
              }
              className="rounded-full"
            />
          </Box>

          <HStack alignItems="center" gap={2} className="shrink-0">
            <Tooltip content="Notifications">
              <IconButton aria-label="Notifications" variant="ghost" rounded size="sm" className="text-muted-foreground">
                <BellIcon />
              </IconButton>
            </Tooltip>
            <Avatar src="https://i.pravatar.cc/100?img=8" alt="You" fallback="You" size="sm" />
          </HStack>
        </HStack>
      </Box>

      {/* 3-column layout */}
      <Box className="mx-auto w-full max-w-6xl px-4">
        <Grid columns={{ default: 1, md: 12 }} gap={6} className="py-6" alignItems="start">
          {/* LEFT rail: profile + nav */}
          <Grid
            item
            md={3}
            // FINDING: Grid `item` responsive spans are md/lg only; there's no way
            // to say "hide below md". Used raw `hidden md:block` to drop the rail
            // on mobile. Also sticky needs raw top-*/self-start.
            className="hidden md:block sticky top-20 self-start"
          >
            <VStack gap={4}>
              {/* Profile card */}
              <Card>
                <CardContent className="p-4">
                  <VStack gap={3}>
                    <HStack gap={3} alignItems="center">
                      <Avatar src="https://i.pravatar.cc/100?img=8" alt="You" fallback="You" size="lg" />
                      <VStack gap={0} className="min-w-0">
                        <Typography variant="body1" fontWeight="bold" className="truncate">
                          Jane Developer
                        </Typography>
                        <Typography variant="body2" color="muted" className="truncate">
                          @janedev
                        </Typography>
                      </VStack>
                    </HStack>
                    <HStack gap={4}>
                      <HStack gap={1}>
                        <Typography variant="body2" fontWeight="bold">
                          842
                        </Typography>
                        <Typography variant="body2" color="muted">
                          Following
                        </Typography>
                      </HStack>
                      <HStack gap={1}>
                        <Typography variant="body2" fontWeight="bold">
                          12.4K
                        </Typography>
                        <Typography variant="body2" color="muted">
                          Followers
                        </Typography>
                      </HStack>
                    </HStack>
                  </VStack>
                </CardContent>
              </Card>

              {/* Nav */}
              <Card>
                <CardContent className="p-2">
                  <VStack gap={0} as="nav">
                    {navItems.map((item) => (
                      <a
                        key={item.label}
                        href="#"
                        // FINDING: No NavItem/ListItemButton component with
                        // active state + leading icon + trailing badge. Built as a
                        // raw <a> with hover/active Tailwind classes.
                        className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                          item.active
                            ? 'bg-accent/10 text-accent'
                            : 'text-foreground hover:bg-muted'
                        }`}
                      >
                        <span className="[&>svg]:h-5 [&>svg]:w-5">{item.icon}</span>
                        <span className="flex-1">{item.label}</span>
                        {item.count ? (
                          <Badge color="destructive" className="h-5 min-w-5 justify-center px-1.5">
                            {item.count}
                          </Badge>
                        ) : null}
                      </a>
                    ))}
                  </VStack>
                </CardContent>
              </Card>

              <Button fullWidth color="accent" className="rounded-full">
                New Post
              </Button>
            </VStack>
          </Grid>

          {/* CENTER: composer + feed */}
          <Grid item md={6}>
            <VStack gap={4}>
              {/* Composer */}
              <Card>
                <CardContent className="p-4">
                  <HStack gap={3} alignItems="start">
                    <Avatar src="https://i.pravatar.cc/100?img=8" alt="You" fallback="You" size="md" />
                    <VStack gap={3} className="flex-1">
                      <Textarea
                        placeholder="What's on your mind?"
                        rows={2}
                        // FINDING: Textarea has no borderless/ghost variant; overrode
                        // to remove the border and min-height for an inline composer.
                        className="min-h-0 resize-none border-0 px-0 text-lg focus-visible:ring-0"
                      />
                      <Separator />
                      <HStack justifyContent="between" alignItems="center">
                        <HStack gap={1} className="text-accent">
                          <IconButton aria-label="Add image" variant="ghost" size="sm" rounded className="text-accent">
                            <ImageIcon />
                          </IconButton>
                          <IconButton aria-label="Schedule" variant="ghost" size="sm" rounded className="text-accent">
                            <CalendarIcon />
                          </IconButton>
                        </HStack>
                        <Button color="accent" size="sm" className="rounded-full">
                          Post
                        </Button>
                      </HStack>
                    </VStack>
                  </HStack>
                </CardContent>
              </Card>

              {/* Feed */}
              {posts.map((post) => (
                <FeedPost key={post.handle} post={post} />
              ))}
            </VStack>
          </Grid>

          {/* RIGHT rail: trends + who to follow */}
          <Grid item md={3} className="hidden md:block sticky top-20 self-start">
            <VStack gap={4}>
              {/* Trends */}
              <Card>
                <CardContent className="p-0">
                  <Box px={4} py={3}>
                    <HStack gap={2} alignItems="center">
                      <span className="[&>svg]:h-5 [&>svg]:w-5 text-accent">
                        <TrendUpIcon />
                      </span>
                      <Typography variant="h6" fontWeight="bold">
                        Trending
                      </Typography>
                    </HStack>
                  </Box>
                  <Separator />
                  <VStack gap={0}>
                    {trends.map((t) => (
                      <Box
                        key={t.topic}
                        as="a"
                        px={4}
                        py={3}
                        className="block cursor-pointer transition-colors hover:bg-muted"
                      >
                        <Typography variant="caption" color="muted">
                          {t.category}
                        </Typography>
                        <Typography variant="body2" fontWeight="bold" className="block">
                          {t.topic}
                        </Typography>
                        <Typography variant="caption" color="muted">
                          {t.posts}
                        </Typography>
                      </Box>
                    ))}
                  </VStack>
                </CardContent>
              </Card>

              {/* Who to follow */}
              <Card>
                <CardContent className="p-0">
                  <Box px={4} py={3}>
                    <Typography variant="h6" fontWeight="bold">
                      Who to follow
                    </Typography>
                  </Box>
                  <Separator />
                  <VStack gap={0}>
                    {suggestions.map((s) => (
                      <HStack key={s.handle} gap={3} alignItems="center" justifyContent="between" className="px-4 py-3">
                        <HStack gap={3} alignItems="center" className="min-w-0">
                          <Avatar src={s.avatar} alt={s.name} fallback={s.name} size="md" />
                          <VStack gap={0} className="min-w-0">
                            <Typography variant="body2" fontWeight="bold" className="truncate">
                              {s.name}
                            </Typography>
                            <Typography variant="caption" color="muted" className="truncate">
                              {s.handle}
                            </Typography>
                          </VStack>
                        </HStack>
                        <Button variant="outlined" size="sm" className="rounded-full">
                          Follow
                        </Button>
                      </HStack>
                    ))}
                  </VStack>
                </CardContent>
              </Card>

              <Typography variant="caption" color="muted" className="px-2">
                © 2032 Onegram · Terms · Privacy · About
              </Typography>
            </VStack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export const Default: Story = {
  render: () => <SocialFeed />,
}

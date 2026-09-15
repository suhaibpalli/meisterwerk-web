import type { Metadata } from 'next'
import { PREVIEW_LOCK } from '@/lib/preview'
import { PreviewLock } from '@/components/site/PreviewLock'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PROJECTS, photo } from '@/lib/content'
import { ImageReveal } from '@/components/motion/ImageReveal'
import { Reveal } from '@/components/motion/Reveal'
import { SplitLines } from '@/components/motion/SplitLines'

type Params = { params: Promise<{ slug: string }> }

/** Pre-renders every project at build time; new slugs still resolve. */
export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const project = PROJECTS.find((p) => p.slug === slug)
  if (!project) return {}

  return {
    title: `${project.descriptor} — ${project.location}`,
    description: `${project.scope}, ${project.area}, ${project.programme}. ${project.description.slice(0, 120)}…`,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.descriptor} — ${project.location}`,
      description: `${project.scope} · ${project.area} · ${project.programme}`,
      images: [photo(project.photo, 1200, 630, 80)],
    },
  }
}

export default async function ProjectPage({ params }: Params) {
  if (PREVIEW_LOCK) return <PreviewLock title="Project" />

  const { slug } = await params
  const index = PROJECTS.findIndex((p) => p.slug === slug)
  if (index === -1) notFound()

  const project = PROJECTS[index]
  const next = PROJECTS[(index + 1) % PROJECTS.length]

  const facts = [
    ['Location', project.location],
    ['Area', project.area],
    ['Scope', project.scope],
    ['Programme', project.programme],
    ['Completed', project.year],
  ]

  return (
    <>
      {/* The banner carries the nav, per the brief. The scrim is weighted to
          the head of the frame to hold it, the same as the home page. */}
      <section data-nav="dark" className="relative h-[72svh] min-h-[440px] w-full">
        <Image
          src={photo(project.photo, 2400, 1500, 85)}
          alt={`${project.descriptor}, ${project.location}`}
          fill
          priority
          quality={90}
          sizes="100vw"
          className="u-img object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(11,11,11,0.86) 0%, rgba(11,11,11,0.46) 38%, rgba(11,11,11,0.20) 66%, rgba(11,11,11,0.60) 100%)',
          }}
        />
        <div className="u-container absolute inset-x-0 top-0 pt-32 md:pt-40">
          <Reveal>
            <Link href="/projects" className="u-eyebrow hover:text-paper">
              ← Projects
            </Link>
          </Reveal>
          <SplitLines
            as="h1"
            className="u-display mt-6 max-w-[14ch] text-paper-soft"
            delay={0.1}
          >
            {project.descriptor}
          </SplitLines>
        </div>
      </section>

      <div className="u-container py-block-sm md:py-block">
        <div className="grid gap-12 md:grid-cols-12 md:gap-0">
          <Reveal className="md:col-span-7 md:pr-16">
            <p className="max-w-[56ch] text-lead leading-relaxed text-mute-70">
              {project.description}
            </p>
          </Reveal>

          <Reveal className="md:col-span-4 md:col-start-9">
            <dl className="space-y-5">
              {facts.map(([term, value]) => (
                <div key={term} className="border-t border-hair pt-3">
                  <dt className="text-[0.625rem] uppercase tracking-[0.18em] text-mute-30">
                    {term}
                  </dt>
                  <dd className="mt-1.5 tabular-nums text-paper">{value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal className="mt-20 md:mt-28">
          <ImageReveal className="relative aspect-[16/10] w-full md:aspect-[21/9]">
            <Image
              src={photo(project.photo, 2400, 1030, 82)}
              alt={`${project.descriptor} — detail`}
              fill
              sizes="100vw"
              className="u-img object-cover"
            />
          </ImageReveal>
          <p className="mt-4 text-micro text-mute-30">
            Further photography to follow from the maison&rsquo;s approved set.
          </p>
        </Reveal>
      </div>

      <div className="u-container pb-block-sm md:pb-block">
        <hr className="u-rule" />
        <Reveal>
          <Link
            href={`/projects/${next.slug}`}
            className="group flex flex-wrap items-baseline justify-between gap-x-10 gap-y-3 pt-10"
          >
            <span>
              <span className="u-eyebrow block">Next project</span>
              <span className="mt-3 block font-display text-h2 font-light tracking-[-0.01em]">
                {next.descriptor}
              </span>
            </span>
            <span className="text-[0.6875rem] uppercase tracking-[0.2em] tabular-nums text-mute-50">
              {next.location} · {next.area}
            </span>
          </Link>
        </Reveal>
      </div>
    </>
  )
}

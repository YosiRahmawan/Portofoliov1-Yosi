import { Document, Image, Link, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import { journey } from '../../data/journey'
import { profile } from '../../data/profile'
import { projects } from '../../data/projects'
import { socials } from '../../data/socials'

const BLUE = '#2563eb'

const s = StyleSheet.create({
  page: { padding: 40, fontSize: 10, lineHeight: 1.45, color: '#0a0a0a', fontFamily: 'Helvetica' },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 18 },
  name: { fontSize: 24, lineHeight: 1.2, fontFamily: 'Helvetica-Bold', letterSpacing: -0.5 },
  role: { fontSize: 12, color: BLUE, marginTop: 4, marginBottom: 8 },
  contact: { fontSize: 9.5, color: '#333' },
  link: { color: '#333', textDecoration: 'none' },
  photo: { width: 80, height: 100, objectFit: 'cover', objectPosition: '50% 0%' },
  section: { marginTop: 12 },
  heading: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 10,
    letterSpacing: 2,
    textTransform: 'uppercase',
    borderBottomWidth: 1,
    borderBottomColor: '#0a0a0a',
    paddingBottom: 3,
    marginBottom: 6,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  bold: { fontFamily: 'Helvetica-Bold' },
  muted: { color: '#555' },
  item: { marginBottom: 6 },
  bullet: { flexDirection: 'row', paddingLeft: 6 },
  dot: { width: 8 },
})

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={s.section}>
      <Text style={s.heading}>{title}</Text>
      {children}
    </View>
  )
}

function Bullets({ items }: { items: string[] }) {
  return items.map((t) => (
    <View key={t} style={s.bullet}>
      <Text style={s.dot}>•</Text>
      <Text style={{ flex: 1 }}>{t}</Text>
    </View>
  ))
}

// photoSrc: URL absolut foto (react-pdf butuh URL penuh di browser)
export function CvDocument({ photoSrc }: { photoSrc?: string }) {
  const education = journey.filter((j) => j.type === 'education')
  const experience = journey.filter((j) => j.type === 'experience')
  const links = socials.filter((x) => x.url)

  return (
    <Document title={`CV ${profile.name}`} author={profile.name}>
      <Page size="A4" style={s.page}>
        <View style={s.header}>
          <View style={{ flex: 1, paddingRight: 16 }}>
            <Text style={s.name}>{profile.name.toUpperCase()}</Text>
            <Text style={s.role}>{profile.role}</Text>
            {profile.whatsapp ? <Text style={s.contact}>WhatsApp: +{profile.whatsapp}</Text> : null}
            {profile.email ? <Text style={s.contact}>{profile.email}</Text> : null}
            {profile.location ? <Text style={s.contact}>{profile.location}</Text> : null}
            {links.map((l) => (
              <Link key={l.label} src={l.url} style={s.link}>
                <Text style={s.contact}>{l.label}: {l.url.replace(/^https?:\/\/(www\.)?/, '')}</Text>
              </Link>
            ))}
          </View>
          {photoSrc ? <Image src={photoSrc} style={s.photo} /> : null}
        </View>

        <Section title="Profile">
          <Text>{profile.bio}</Text>
        </Section>

        {experience.length > 0 && (
          <Section title="Experience">
            {[...experience].reverse().map((j) => (
              <View key={j.title + j.place} style={s.item} wrap={false}>
                <View style={s.row}>
                  <Text style={s.bold}>{j.title}</Text>
                  <Text style={s.muted}>{j.period}</Text>
                </View>
                <Text style={s.muted}>{j.place}</Text>
                <Bullets items={j.bullets?.length ? j.bullets : [j.description]} />
              </View>
            ))}
          </Section>
        )}

        <Section title="Education">
          {[...education].reverse().map((j) => (
            <View key={j.title + j.place} style={s.item} wrap={false}>
              <View style={s.row}>
                <Text style={s.bold}>{j.place}</Text>
                <Text style={s.muted}>{j.period}</Text>
              </View>
              <Text>{j.title}</Text>
            </View>
          ))}
        </Section>

        <Section title="Skills">
          {Object.entries(profile.skillGroups).map(([group, items]) => (
            <Text key={group} style={{ marginBottom: 2 }}>
              <Text style={s.bold}>{group}: </Text>
              {items.join(', ')}
            </Text>
          ))}
        </Section>

        {projects.length > 0 && (
          <Section title="Projects">
            {projects.map((p) => (
              <View key={p.title} style={s.item} wrap={false}>
                <Text style={s.bold}>{p.title}</Text>
                <Text>{p.description}</Text>
                <Text style={s.muted}>{p.tech.join(' · ')}</Text>
              </View>
            ))}
          </Section>
        )}
      </Page>
    </Document>
  )
}

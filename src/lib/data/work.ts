// ─── Types ────────────────────────────────────────────────────────────────────

export type Category = 'cases' | 'projects' | 'books';

export interface TimelineEvent {
	year: string;
	label: string;
}

export interface Quote {
	text: string;
	attribution?: string;
}

export interface WorkItem {
	slug: string;
	category: Category;
	title: string;
	subtitle?: string;
	year?: string;
	dates?: string;
	tag?: string; // e.g. "Landmark Case", "Children's Book"
	coverSrc?: string;
	coverAlt?: string;
	heroSrc?: string;           // wide banner image (optional)
	summary: string;            // short teaser used on cards
	body: string[];             // array of paragraphs for the detail page
	timeline?: TimelineEvent[];
	quote?: Quote;
	accolades?: string[];
	externalHref?: string;
	relatedSlugs?: string[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

export const workItems: WorkItem[] = [
	// ──── Landmark Cases ──────────────────────────────────────────────────────
	{
		slug: 'johnny-foote',
		category: 'cases',
		title: "Johnny Foote's Story",
		subtitle: 'Wrongful Confession · Justice Served',
		dates: '1984',
		tag: 'Landmark Case',
		summary:
			'Successfully defending a man who had falsely confessed to murder — exposing coercive interrogation and setting an innocent man free.',
		body: [
			'In 1984, Cynthia Clack took on one of the most harrowing cases of her career: defending Johnny Foote, a man who had signed a confession to the murder of Velma Nesset — a murder he did not commit.',
			'The confession, given under intense psychological pressure, was the prosecution\'s cornerstone. Against the odds, Clack and her co-counsel John Hoestenbach systematically dismantled the State\'s case, demonstrating that the confession was the product of coercion and did not align with the physical evidence at the scene.',
			'The jury returned a verdict of Not Guilty. Subsequent investigation revealed that the actual perpetrator was someone else entirely. The case drew attention from true-crime journalists and legal scholars as a stark illustration of how false confessions — driven by fear, exhaustion, and unrelenting interrogation — can nearly send an innocent person to prison.',
			'For Cynthia, the case crystallized a lifelong mission: to look beyond the surface, question the "obvious" narrative, and fight relentlessly for the truth — even when the truth is inconvenient.',
		],
		timeline: [
			{ year: '1984', label: 'Johnny Foote arrested and provides a coerced confession' },
			{ year: '1984', label: 'Cynthia Clack and co-counsel John Hoestenbach take the case' },
			{ year: '1984', label: 'Jury returns a Not Guilty verdict after thorough cross-examination' },
			{ year: 'After', label: 'Investigation identifies the actual perpetrator; case gains true-crime notoriety' },
		],
		quote: {
			text: 'A confession is not proof of guilt. It is proof that someone said words — and our job was to find out why.',
			attribution: 'Cynthia L. Clack',
		},
		accolades: [
			'Acquittal secured despite a signed confession',
			'Documented in Texas true-crime archives',
			'Demonstrates the danger of coerced confessions',
		],
		relatedSlugs: ['emily-wu', 'discovering-the-club'],
	},
	{
		slug: 'emily-wu',
		category: 'cases',
		title: 'The Emily Wu Case',
		subtitle: 'International Kidnapping · Cross-Border Custody',
		dates: '2000s',
		tag: 'Landmark Case',
		summary:
			'Representing a mother in a high-profile international child abduction case that made headlines in China and reshaped how cross-border custody cases are handled.',
		body: [
			'The Emily Wu case thrust Cynthia Clack onto an international stage. Emily Wu, a Chinese national, was at the center of a complex and emotionally charged international child kidnapping and custody dispute that crossed legal systems, languages, and continents.',
			"Clack represented Emily in navigating the labyrinthine intersection of Texas family law and international treaty obligations. The case required coordinating with legal counsel in China, communicating with Chinese governmental authorities, and managing intense media scrutiny — both domestically and abroad.",
			'The matter received significant coverage in China, where it became a touchstone in discussions about international parental abduction, the rights of foreign nationals in U.S. courts, and the adequacy of cross-border legal frameworks.',
			"As a result of Cynthia's advocacy, she and her client became well known figures in China. The case reinforced her reputation as an attorney who does not shy away from complexity — and who fights with the same ferocity whether the arena is a local courtroom or an international dispute.",
		],
		timeline: [
			{ year: 'Early 2000s', label: 'Emily Wu seeks legal representation in a complex custody dispute' },
			{ year: '2000s', label: 'Cynthia Clack takes the case, coordinating with international counsel' },
			{ year: '2000s', label: 'Case attracts significant media attention in China' },
			{ year: 'Resolution', label: 'Case resolved; Cynthia and Emily become prominent figures in international custody advocacy' },
		],
		quote: {
			text: 'Borders do not diminish a mother\'s right to her child. We fought in every jurisdiction necessary.',
			attribution: 'Cynthia L. Clack',
		},
		accolades: [
			'Nationally reported in Chinese press',
			'Highlighted gaps in international custody law',
			'Solidified Cynthia\'s reputation in cross-border family law',
		],
		relatedSlugs: ['johnny-foote', 'discovering-the-club'],
	},

	// ──── Projects ────────────────────────────────────────────────────────────
	{
		slug: 'eye-of-the-tiger',
		category: 'projects',
		title: 'Eye of the Tiger — A Rock Opera',
		subtitle: 'Libretto & Lyrics by Cynthia L. Clack · Music by Randall Shafer',
		dates: '2005–2007',
		tag: 'Creative Project',
		coverSrc: '/images/EyeoftheTiger.png',
		coverAlt: 'Eye of the Tiger — A Rock Opera promotional image',
		summary:
			'An autobiographical rock opera that premiered in Odessa, Texas, and toured China by invitation of the Chinese government — performed in Beijing, Shanghai, and beyond.',
		body: [
			'When Cynthia Clack decided to tell her life story, she did not write a conventional memoir. She wrote a rock opera.',
			'Eye of the Tiger premiered in July 2005 at the Globe of the Great Southwest Theater in Odessa, Texas — the only replica of Shakespeare\'s original Globe Theatre in the world. With a libretto and lyrics by Clack and music composed by Randall Shafer, the production wove together the professional triumphs, personal trials, and defining moments of a woman who broke barriers in the Texas legal world.',
			"The show drew capacity crowds and critical praise. But the story did not end in Odessa. The Chinese government extended two formal invitations to bring the production to China, where it was performed more than eight times in major cities including Beijing and Shanghai. The tour introduced Cynthia's story — and her message of resilience, justice, and the human spirit — to audiences halfway around the world.",
			'The rock opera was based on her autobiographical book, The Other Side of Life – An Angel\'s Story (1995), making it part of a broader creative tapestry Cynthia has built over decades alongside her legal career. Eye of the Tiger stands as proof that the courtroom is not the only stage where compelling stories are told.',
		],
		timeline: [
			{ year: '1995', label: 'The Other Side of Life — An Angel\'s Story published (the autobiographical source)' },
			{ year: '2005', label: 'Eye of the Tiger premieres at the Globe of the Great Southwest, Odessa, TX' },
			{ year: '2007', label: 'First Chinese government invitation — performances in Beijing and Shanghai' },
			{ year: '2007', label: 'Second invitation; tour expands to additional Chinese cities (8+ performances)' },
		],
		quote: {
			text: 'I have always believed that the most powerful courtroom is the human heart. The stage gave me another way in.',
			attribution: 'Cynthia L. Clack',
		},
		accolades: [
			'Performed at the Globe of the Great Southwest, Odessa, TX',
			'Invited by the Chinese Government for two international tours',
			'8+ performances across Beijing, Shanghai, and major Chinese cities',
			'Based on her autobiography, The Other Side of Life',
		],
		relatedSlugs: ['discovering-the-club', 'other-side-of-life'],
	},
	{
		slug: 'small-matters',
		category: 'projects',
		title: 'Small Matters',
		subtitle: 'Screenplay',
		dates: '2000s',
		tag: 'Creative Project',
		summary:
			'A feature-length screenplay exploring the hidden injustices in everyday legal proceedings — and the people who refuse to accept them.',
		body: [
			'Small Matters is a feature-length screenplay authored by Cynthia Clack under the banner of Tiger Tale Companies. The script reflects her deep familiarity with the human drama of the legal system — the quiet injustices, the moments of grace, and the courage it takes to stand up when the stakes feel small to everyone except those who are suffering.',
			"Drawing on decades in the courtroom, Clack uses Small Matters to examine how systemic issues manifest in individual lives — particularly the lives of families navigating courts that don't always see them clearly.",
			'The screenplay has been developed as part of Cynthia\'s ongoing creative output alongside her published books and theatrical work, demonstrating her commitment to storytelling as a form of advocacy.',
		],
		accolades: [
			'Developed under Tiger Tale Companies',
			'Feature-length screenplay',
			'Rooted in her experience as a family law trial attorney',
		],
		relatedSlugs: ['eye-of-the-tiger', 'discovering-the-club'],
	},

	// ──── Books ───────────────────────────────────────────────────────────────
	{
		slug: 'discovering-the-club',
		category: 'books',
		title: 'Discovering the Club',
		subtitle: 'Inside the Hidden World of Family Court',
		year: '2026',
		tag: 'Book',
		coverSrc: '/images/wk2_Monday_Insta_v3.png',
		coverAlt: 'Discovering the Club book cover by Cynthia L. Clack',
		summary:
			'A powerful exposé of the hidden patterns inside the family court system — parental alienation, institutional failure, and the resilience of those caught in between.',
		body: [
			"Discovering the Club is Cynthia Clack's most urgent book yet — a meticulously researched and passionately argued examination of what she calls \"the club\": the informal networks of habit, precedent, and institutional inertia that shape outcomes in family courts across America.",
			"Drawing on more than four decades of firsthand experience as a Board-Certified Family Law attorney in Odessa, Texas, Clack documents the patterns she has witnessed — and fought against — throughout her career. Parental alienation, custody evaluations that fail children, and systems that too often prioritize process over people.",
			'But Discovering the Club is not merely a critique. It is also a guide — for parents, advocates, and legal professionals — on how to navigate a system that can feel overwhelming, opaque, and deeply unfair. Clack\'s voice is both the seasoned attorney and the compassionate human being who has sat across from thousands of families in crisis.',
			'Published in 2026, this book represents the culmination of a career dedicated not just to winning cases, but to changing the systems that create them.',
		],
		timeline: [
			{ year: '1978', label: 'Cynthia admitted to the State Bar of Texas; begins practicing family law' },
			{ year: '1984–2000s', label: 'Decades of landmark cases that inform the book\'s findings' },
			{ year: '2026', label: 'Discovering the Club published' },
		],
		quote: {
			text: 'The "club" is not a conspiracy. It is something far more pervasive and far more difficult to change — it is a culture. And cultures can be changed when enough people understand them.',
			attribution: 'Cynthia L. Clack, Discovering the Club',
		},
		accolades: [
			'Published 2026',
			'Four decades of courtroom experience distilled',
			'Essential reading for family law advocates and parents',
		],
		externalHref: 'https://cynthiaclack.com',
		relatedSlugs: ['crossing-together', 'johnny-foote', 'emily-wu'],
	},
	{
		slug: 'crossing-together',
		category: 'books',
		title: 'Crossing Together',
		subtitle: 'A Journey of Faith and Resilience',
		year: '2017',
		tag: 'Book',
		summary:
			'A memoir of faith, resilience, and the unexpected crossings that define a life — told with Clack\'s characteristic honesty and warmth.',
		body: [
			'Crossing Together explores the intersections of personal faith, professional purpose, and the unexpected turns that shape a human life. Cynthia Clack brings the same unflinching honesty to this memoir as she does to the courtroom — nothing is softened, and nothing is left unsaid.',
			"The book reflects on moments of doubt and renewal, on the relationships that have sustained her, and on the deeper meaning she has found in four decades of serving clients at their most vulnerable. It is a book about crossing — crossing legal, cultural, and personal thresholds — and doing so alongside others.",
			'Published in 2017, Crossing Together has resonated with readers who appreciate candid reflection from a woman who has built a remarkable life by refusing to accept limitations — whether placed by others or by circumstance.',
		],
		accolades: [
			'Published 2017',
			'A deeply personal account of faith and purpose',
			'Companion to her legal and creative body of work',
		],
		externalHref: 'https://cynthiaclack.com',
		relatedSlugs: ['discovering-the-club', 'other-side-of-life'],
	},
	{
		slug: 'other-side-of-life',
		category: 'books',
		title: 'The Other Side of Life — An Angel\'s Story',
		subtitle: 'Memoir · First of a Trilogy',
		year: '1995',
		tag: 'Book',
		summary:
			'The first book in Cynthia\'s autobiographical trilogy — a reflection on her life as a trial lawyer, mentor, and artist that later inspired the internationally performed rock opera Eye of the Tiger.',
		body: [
			'Published in 1995, The Other Side of Life — An Angel\'s Story is the first volume of an autobiographical trilogy in which Cynthia Clack reflects on her remarkable life as a trial lawyer, mentor, and artist.',
			"The book captures the early arc of a career that would become one of the most distinctive in Texas legal history: a woman who arrived in Odessa in 1978 as one of the first female attorneys to practice there, who quickly built a reputation for fearless advocacy, and who never stopped creating.",
			'Equal parts memoir and meditation, The Other Side of Life asks big questions about purpose, justice, and what it means to truly see another person in crisis. It is written with the candor and emotional intelligence that has defined Cynthia\'s public voice for decades.',
			'The book later served as the source material for Eye of the Tiger, the rock opera that Cynthia wrote and which toured internationally under the invitation of the Chinese government.',
		],
		timeline: [
			{ year: '1978', label: 'Cynthia begins practicing law in Odessa — one of the first women attorneys there' },
			{ year: '1995', label: 'The Other Side of Life published — first of a planned trilogy' },
			{ year: '2005', label: 'Material forms the basis of the rock opera Eye of the Tiger' },
		],
		accolades: [
			'Published 1995',
			'First volume of a planned autobiographical trilogy',
			'Basis for the internationally performed rock opera Eye of the Tiger',
		],
		externalHref: 'https://cynthiaclack.com',
		relatedSlugs: ['eye-of-the-tiger', 'crossing-together'],
	},
	{
		slug: 'doodles-american-hero',
		category: 'books',
		title: 'Doodles the American Hero',
		subtitle: 'Children\'s Book Series — Volume 2',
		year: '2008',
		tag: "Children's Book",
		coverSrc: '/images/SKMBT_C35313012115410.jpg',
		coverAlt: 'Doodles the American Hero book cover by Cynthia L. Clack',
		summary:
			'The second adventure of Doodles the American Poodle — an endearing canine hero who teaches young readers about courage, kindness, and what it truly means to be an American.',
		body: [
			"Doodles the American Hero is the second installment in Cynthia Clack's beloved children's book series featuring Doodles — a charming and patriotic American Poodle whose adventures celebrate the values of courage, kindness, and community.",
			'Published in 2008, the book builds on the warmth and accessibility of the first volume, Doodles the American Poodle (2004), introducing young readers to themes of heroism — not the grand, dramatic kind, but the everyday heroism of being kind, standing up for others, and being true to oneself.',
			"Illustrated with vibrant imagery and written with Cynthia's characteristic heart, the Doodles series has been a gift to families who want engaging stories that carry real values. The series reflects Cynthia's belief that the most important lessons begin early — and that the right story, at the right moment, can shape a child's understanding of the world.",
		],
		accolades: [
			'Second in the Doodles children\'s series',
			'Published 2008 under Tiger Tale Companies',
			'Celebrates courage, kindness, and American values',
		],
		relatedSlugs: ['doodles-american-poodle'],
	},
	{
		slug: 'doodles-american-poodle',
		category: 'books',
		title: 'Doodles the American Poodle',
		subtitle: "Children's Book Series — Volume 1",
		year: '2004',
		tag: "Children's Book",
		summary:
			"The debut of Doodles — a loveable American Poodle whose adventures introduce children to friendship, patriotism, and the joy of being true to yourself.",
		body: [
			"Doodles the American Poodle introduces readers to one of Cynthia Clack's most beloved creations: Doodles, a charming poodle whose adventures are equal parts fun and meaningful.",
			"Published in 2004 under Tiger Tale Companies, the debut volume established the foundation for a series that would grow to include Doodles the American Hero (2008). From the first page, Doodles captured readers with an irresistible combination of heart and humor.",
			"Cynthia created the series as an expression of values she has held throughout her life: a love of country, a commitment to kindness, and a deep belief that children deserve stories that treat them as the thoughtful, feeling people they are.",
		],
		accolades: [
			'First in the Doodles children\'s series',
			'Published 2004 under Tiger Tale Companies',
			'Launched a beloved characters\' franchise',
		],
		relatedSlugs: ['doodles-american-hero'],
	},
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function getWorkItem(slug: string): WorkItem | undefined {
	return workItems.find((item) => item.slug === slug);
}

export function getByCategory(category: Category): WorkItem[] {
	return workItems.filter((item) => item.category === category);
}

export function getRelated(item: WorkItem): WorkItem[] {
	return (item.relatedSlugs ?? [])
		.map((s) => workItems.find((i) => i.slug === s))
		.filter((i): i is WorkItem => i !== undefined);
}

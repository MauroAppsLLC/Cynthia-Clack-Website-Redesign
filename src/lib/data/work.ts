// ─── Types ────────────────────────────────────────────────────────────────────

export type Category = 'cases' | 'projects' | 'books';

export interface TimelineEvent {
	year: string;
	label: string;
}

export interface Quote {
	text: string;
	attribution?: string;
	isPlaceholder?: boolean;
}

export interface Volume {
	title: string;
	subtitle?: string;
	year?: string;
	summary: string;
	body: string[];
	accolades?: string[];
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
	isPlaceholder?: boolean;
	volumes?: Volume[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

export const workItems: WorkItem[] = [
	// ──── Landmark Cases ──────────────────────────────────────────────────────
	{
		slug: 'johnny-foote',
		category: 'cases',
		title: "Johnny Foote's Story",
		subtitle: 'Wrongful Confession · Justice Served',
		dates: '1982–1984',
		tag: 'Landmark Case',
		isPlaceholder: false,
		coverSrc: '/images/johnny-foote-final.png',
		coverAlt: 'Newspaper photos of attorneys Hoestenbach and Clack during the Johnny Foote case',
		summary:
			'Successfully defending a man who had falsely confessed to murder — exposing coercive interrogation and setting an innocent man free after just 45 minutes of jury deliberation.',
		body: [
			'Johnny Foote was a young co-worker of the slain woman Velma Nesset at Permian Mall, working the early morning shift. When Velma did not show up for work, Johnny was sent to search the ditch and culvert she would have crossed on her three-block walk. He reported seeing nothing — and because of the position of the sun and the shadows inside the culvert, the body was not visible from where he stood. His insistence that no one had been there raised suspicion with detectives.',
			"Johnny — a man whose intelligence quotient was only a point or two above the classification for retardation — became a repeat suspect. Every time a new detective was assigned to the unsolved case, he was hauled in for questioning. He was shown crime-scene photos and accused of having been at the scene. He denied it each time, until the final interrogation when officers told him he had failed a polygraph test. In reality, Johnny had passed. A police officer later testified under oath that it was standard operating procedure in the Odessa Police Department to tell suspects they had failed when they had in fact passed.",
			'Broken by months of repeated interrogation, Johnny confessed to a crime he did not commit. A psychiatrist who testified on his behalf likened it to a workaholic husband wrongly accused of an affair by his wife night after night — eventually he would agree to whatever she said just to make it stop.',
			"Cynthia Clack and co-counsel John Hoestenbach took the case. Where most attorneys would have read the confession, negotiated the best plea bargain, and collected their fee, Cynthia investigated far beyond the confession. She discovered Johnny had no motive, no weapon, and no opportunity — he was surrounded by other people during the entire time frame when, according to the autopsy, the killing had taken place.",
			'The hard work paid off. After only forty-five minutes of deliberation, the jury returned a verdict of Not Guilty. In July 2021, KBAT DJ Tawny the Rock Chick featured the case on the series 365 Days Of Texas True Crime, and subsequent DNA evidence definitively linked the murder to another man, Billy Wayne Ludwigson.',
			'For Cynthia, the case crystallized a lifelong mission: to look beyond the surface, question the "obvious" narrative, and fight relentlessly for the truth. As she later reflected, it had not been her job to judge the man — it had been her job to represent him to the best of her ability. She had done that, and justice had been served.',
		],
		timeline: [
			{ year: '1982', label: 'Velma Nesset murdered near Permian Mall; Johnny Foote becomes a suspect' },
			{ year: '1982–1984', label: 'Johnny repeatedly interrogated; told he failed a polygraph he actually passed' },
			{ year: '1984', label: 'Cynthia Clack and co-counsel John Hoestenbach take the case' },
			{ year: '1984', label: 'Jury returns Not Guilty after just 45 minutes of deliberation' },
			{ year: '2021', label: 'Case featured on 365 Days Of Texas True Crime; DNA links murder to another man' },
		],
		quote: {
			text: 'The confession of Johnny Foote had not said what he meant. The confession did not mean what it said.',
			attribution: 'From The Other Side of Life — An Angel\'s Story, Chapter Six',
		},
		accolades: [
			'Acquittal secured despite a signed confession',
			'Not Guilty verdict returned in just 45 minutes',
			'Featured on 365 Days Of Texas True Crime (2021)',
			'DNA evidence later confirmed Johnny\'s innocence',
			'Excerpt published in The Other Side of Life — An Angel\'s Story',
		],
		relatedSlugs: ['emily-wu', 'discovering-the-club'],
	},
	{
		slug: 'emily-wu',
		category: 'cases',
		title: 'The Emily Wu Case',
		subtitle: 'International Kidnapping · Cross-Border Custody',
		dates: '2005-2006',
		tag: 'Landmark Case',
		isPlaceholder: false,
		coverSrc: '/images/emilywu1.jpeg',
		coverAlt: 'KMID news coverage of the Emily Wu custody case',
		heroSrc: '/images/emilywu2.jpeg',
		summary:
			'Representing a mother in a high-profile international child abduction case that made headlines in China and reshaped how cross-border custody cases are handled.',
		body: [
			'The Emily Wu case thrust Cynthia Clack onto an international stage. In November 2005, Emily Wu — a Chinese national — found herself at the center of a complex and emotionally charged international child kidnapping and custody dispute after her two-year-old son was taken from Guangzhou, China, and brought to Texas.',
			"Clack represented Emily in navigating the labyrinthine intersection of Texas family law and international treaty obligations. The case required coordinating with legal counsel in China, communicating with Chinese governmental authorities, and managing intense media scrutiny — both domestically and abroad.",
			'The matter received significant coverage in China, where it became a touchstone in discussions about international parental abduction, the rights of foreign nationals in U.S. courts, and the adequacy of cross-border legal frameworks.',
			"In January 2006, an Ector County judge granted Wu temporary custody of her son. As a result of Cynthia's advocacy, she and her client became well-known figures in China. The case reinforced her reputation as an attorney who does not shy away from complexity.",
		],
		timeline: [
			{ year: 'November 2005', label: 'Emily Wu\'s son taken from Guangzhou, China; Wu travels to Texas' },
			{ year: 'Late 2005', label: 'Cynthia Clack takes the case, coordinating with international counsel' },
			{ year: '2005-2006', label: 'Case attracts significant media attention in China' },
			{ year: 'January 2006', label: 'Ector County judge grants Wu temporary custody; case resolved in Texas' },
		],
		// quote: {
		// 	text: '[Quote to be provided. This is a temporary placeholder to demonstrate the quote layout.]',
		// 	isPlaceholder: true,
		// },
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
		dates: '2005-2007',
		tag: 'Creative Project',
		isPlaceholder: true,
		coverSrc: '/images/EyeoftheTiger.png',
		coverAlt: 'Eye of the Tiger — A Rock Opera promotional image',
		summary:
			'An autobiographical rock opera that premiered in Odessa, Texas, and was invited to tour China by the Chinese government.',
		body: [
			'When Cynthia Clack decided to tell her life story, she did not write a conventional memoir. She wrote a rock opera.',
			'Eye of the Tiger premiered in July 2005 at the Globe of the Great Southwest Theater in Odessa, Texas — one of the most authentic replicas of Shakespeare\'s Globe Theatre in the United States. With a libretto and lyrics by Clack and music composed by Randall Shafer, the production wove together the professional triumphs, personal trials, and defining moments of a woman who broke barriers in the Texas legal world.',
			"Following its initial run, Chinese producers extended formal invitations to bring the production to China for a tour in 2007. While the tour ultimately did not materialize due to logistical challenges, the invitations stood as a testament to the international interest in her story.",
			'The rock opera was based on her autobiographical book, The Other Side of Life - An Angel\'s Story (1995), making it part of a broader creative tapestry Cynthia has built over decades alongside her legal career.',
		],
		timeline: [
			{ year: '1995', label: 'The Other Side of Life — An Angel\'s Story published (the autobiographical source)' },
			{ year: '2005', label: 'Eye of the Tiger premieres at the Globe of the Great Southwest, Odessa, TX' },
			{ year: '2007', label: 'Invited by the Chinese government for an international tour' },
		],
		// quote: {
		// 	text: '[Quote to be provided. This is a temporary placeholder to demonstrate the quote layout.]',
		// 	isPlaceholder: true,
		// },
		accolades: [
			'Performed at the Globe of the Great Southwest, Odessa, TX',
			'Invited by the Chinese Government for an international tour',
			'Based on her autobiography, The Other Side of Life',
		],
		relatedSlugs: ['discovering-the-club', 'doodles-the-series'],
	},
	// {
	// 	slug: 'small-matters',
	// 	category: 'projects',
	// 	title: 'Small Matters',
	// 	subtitle: 'Screenplay',
	// 	dates: '2000s',
	// 	tag: 'Creative Project',
	// 	isPlaceholder: true,
	// 	summary:
	// 		'A quirky feature-length comedy screenplay about an up-and-coming symphonic conductor who finds themselves in a city inhabited entirely by little people.',
	// 	body: [
	// 		'Small Matters is a feature-length screenplay authored by Cynthia Clack under the banner of Tiger Tale Companies.',
	// 		"A departure from her legal work, the script is a quirky comedy in which a lapse in behavioral etiquette causes an up-and-coming symphonic conductor to find themselves in a city inhabited entirely by little people. Some reports have described the project as being loosely based on The Wizard of Oz.",
	// 		'The screenplay highlights Cynthia\'s versatile creative output alongside her published books and theatrical work, showcasing her imagination beyond the courtroom.',
	// 	],
	// 	accolades: [
	// 		'Developed under Tiger Tale Companies',
	// 		'Feature-length comedy screenplay',
	// 	],
	// 	relatedSlugs: ['eye-of-the-tiger', 'discovering-the-club'],
	// },

	// ──── Books ───────────────────────────────────────────────────────────────
	{
		slug: 'discovering-the-club',
		category: 'books',
		title: 'Discovering the Club',
		subtitle: 'Piecing Together the Publishing Network',
		year: '2026',
		tag: 'Book',
		isPlaceholder: false,
		coverSrc: '/images/discovering_the_club_final.jpeg',
		coverAlt: 'Discovering the Club book cover by Cynthia L. Clack',
		summary:
			'An insightful guide to the complexities of the publishing industry — navigating the networks, precedents, and patterns that shape the path for authors.',
		body: [
			"In Discovering the Club: Piecing Together the Publishing Network, Cynthia Clack turns her analytical eye toward the literary world. Drawing on her extensive experience as an author and publisher, Clack examines the informal networks and institutional structures that define the modern publishing industry.",
			"The book serves as a essential guide for authors and entrepreneurs, offering a deep dive into the 'publishing network' and providing strategies for navigating a landscape that can often feel opaque to newcomers. It is the culmination of years of firsthand experience in bringing stories to life both in print and on stage.",
		],
		timeline: [
			{ year: '1978', label: 'Cynthia admitted to the State Bar of Texas; begins practicing family law' },
			{ year: '1984-2000s', label: 'Decades of landmark cases and creative works that inform the book\'s findings' },
			{ year: '2026', label: 'Discovering the Club published' },
		],
		// quote: {
		// 	text: '[Quote to be provided. This is a temporary placeholder to demonstrate the quote layout.]',
		// 	isPlaceholder: true,
		// },
		accolades: [
			'Published 2026',
			'[PLACEHOLDER] Additional accolades to be confirmed',
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
		isPlaceholder: true,
		summary:
			'[PLACEHOLDER] Details pending confirmation of publication history.',
		body: [
			'[PLACEHOLDER] The description for Crossing Together is pending confirmation from the author regarding its publication history and contents.',
		],
		accolades: [
			'[PLACEHOLDER] Accolades pending confirmation',
		],
		externalHref: 'https://cynthiaclack.com',
		relatedSlugs: ['discovering-the-club', 'doodles-the-series'],
	},
	// {
	// 	slug: 'other-side-of-life',
	// 	category: 'books',
	// 	title: 'The Other Side of Life — An Angel\'s Story',
	// 	subtitle: 'Memoir · First of a Trilogy',
	// 	year: '1995',
	// 	tag: 'Book',
	// 	isPlaceholder: true,
	// 	summary:
	// 		'The first book in Cynthia\'s autobiographical trilogy — a reflection on her life as a trial lawyer, mentor, and artist that later inspired the internationally performed rock opera Eye of the Tiger.',
	// 	body: [
	// 		'Published in 1995, The Other Side of Life — An Angel\'s Story is the first volume of an autobiographical trilogy in which Cynthia Clack reflects on her remarkable life as a trial lawyer, mentor, and artist.',
	// 		"The book captures the early arc of a career that would become one of the most distinctive in Texas legal history: a woman who arrived in Odessa in 1978 as the third woman to practice law there, who quickly built a reputation for fearless advocacy, and who never stopped creating.",
	// 		'Equal parts memoir and meditation, The Other Side of Life asks big questions about purpose, justice, and what it means to truly see another person in crisis. It is written with the candor and emotional intelligence that has defined Cynthia\'s public voice for decades.',
	// 		'The book later served as the source material for Eye of the Tiger, the rock opera that Cynthia wrote and which premiered in Odessa in 2005. The production attracted international interest, with invitations from Chinese producers for a tour that ultimately did not materialize.',
	// 	],
	// 	timeline: [
	// 		{ year: '1978', label: 'Cynthia begins practicing law in Odessa — the third woman attorney in the city\'s history' },
	// 		{ year: '1995', label: 'The Other Side of Life published — first of a planned trilogy' },
	// 		{ year: '2005', label: 'Material forms the basis of the rock opera Eye of the Tiger' },
	// 	],
	// 	accolades: [
	// 		'Published 1995',
	// 		'First volume of a planned autobiographical trilogy',
	// 		'Basis for the internationally performed rock opera Eye of the Tiger',
	// 	],
	// 	externalHref: 'https://cynthiaclack.com',
	// 	relatedSlugs: ['eye-of-the-tiger', 'crossing-together'],
	// },
	{
		slug: 'doodles-the-series',
		category: 'books',
		title: 'The Doodles Series',
		subtitle: "A Children's Book Series by Cynthia L. Clack",
		year: '2004–present',
		tag: "Children's Book Series",
		isPlaceholder: false,
		coverSrc: '/images/doodles-final.jpg',
		coverAlt: 'Doodles the American Hero book cover by Cynthia L. Clack',
		summary:
			"Follow the adventures of Doodles — a loveable teacup poodle whose stories teach children about friendship, responsibility, diversity, and heroism across five volumes.",
		body: [
			"The Doodles series is one of Cynthia Clack's most beloved creations: a collection of children's books starring a charming teacup poodle whose real-life antics inspired a series of values-based adventures.",
			"The story originated on a rainy afternoon when Cynthia and her nephew, James, decided to write stories together. Cynthia drew inspiration from a friend's dog named 'Dude', whom her friend Jo Lynn Embrey was determined would look like an 'American' poodle rather than the traditional 'goofy, French' haircut.",
			"Across five volumes — three published and two in development — the series follows a little girl named Ashley and her teacup poodle Doodles through adventures that explore responsibility, inclusion, heroism, entrepreneurship, and philanthropy.",
		],
		accolades: [
			'Three volumes published (2004, 2006, 2008)',
			'Two additional volumes in development',
			'Published under Tiger Tale Companies',
			'Based on the real-life antics of a teacup poodle named Dude',
		],
		relatedSlugs: ['discovering-the-club', 'crossing-together'],
		volumes: [
			{
				title: 'Doodles the American Poodle',
				subtitle: 'Volume 1',
				year: '2004',
				summary: "The debut of Doodles — a loveable teacup poodle whose adventures introduce children to friendship, responsibility, and the joy of being true to yourself.",
				body: [
					"In this debut volume, a little girl named Ashley is given a tiny teacup poodle by her father. However, her mother issues a firm ultimatum: the tiny puppy must be trained, or he cannot stay inside the house. As Ashley attempts to train 'Doodles' over the summer, the ball of fluff gets into all kinds of mischief, creating a stir wherever he goes.",
					"Through this entertaining and funny story, children learn the importance of accepting responsibility and the rewards of dedication, all told through Ashley's relatable perspective.",
				],
				accolades: [
					'First in the Doodles children\'s series',
					'Published 2004 under Tiger Tale Companies',
					'Based on the real-life antics of a teacup poodle named Dude',
				],
			},
			{
				title: 'Doodles the American Celebrity',
				subtitle: 'Volume 2',
				year: '2006',
				summary: "Doodles becomes a star and learns that friendship and inclusion are the greatest accolades of all.",
				body: [
					"In the second book of the series, the mischievous teacup poodle becomes a household name. Doodles the American Celebrity introduces a colorful cast of animal friends: Tiny the Flying Chihuahua, Precious the Precocious Persian, and Samurai the Siamese.",
					"The story carries a powerful message of unity: if cats and dogs of different backgrounds can become friends, humans can do the same. Each animal represents a different nationality that has come together to become American.",
					"Ashley also encounters important life lessons through her new neighbor, Eric, whose injuries resulted in his need for a wheelchair. The story emphasizes kindness, empathy, and the understanding that what makes us different also makes our community stronger.",
				],
				accolades: [
					'Introduces Tiny, Precious, and Samurai',
					'Explores themes of diversity and inclusion',
					'Promotes friendship across nationalities',
				],
			},
			{
				title: 'Doodles the American Hero',
				subtitle: 'Volume 3',
				year: '2008',
				summary: "Dedicated to children of the military, Doodles and his friends embark on a daring mission to rescue a kidnapped friend.",
				body: [
					"The third book, Doodles the American Hero, was written for and dedicated to children whose parents serve in the U.S. military. The project was inspired by a conversation with Denise Fleck Sober regarding the unique needs of children whose parents are deployed overseas.",
					"When a foul plot is hatched by the evil Mr. Sad Dumb Insane to kidnap America's favorite celebrity poodle, the animal friends must use their wiles to protect Doodles. Although they thwart the first attempt, the villain manages to kidnap their friend, Buster the Bulldog.",
					"Doodles and his team must leave immediately on a rescue mission. Cynthia uses the story to explain to a tearful Ashley why her pets must go on their mission, providing a fun and comforting way for children to understand conflict and world events.",
					"The book has been met with enthusiastic responses from children, who find a sense of understanding and insight within its pages.",
				],
				accolades: [
					'Dedicated to U.S. military families',
					'Helps children understand global conflict',
					'Features the rescue of Buster the Bulldog',
				],
			},
			{
				title: 'Doodles the American Entrepreneur',
				subtitle: 'Volume 4',
				summary: "The upcoming fourth adventure in the Doodles series.",
				body: [
					"Doodles the American Entrepreneur is currently in the creative stage, as Cynthia Clack continues to build upon the legacy of America's favorite poodle.",
				],
			},
			{
				title: 'Doodles the American Philanthropist',
				subtitle: 'Volume 5',
				summary: "The upcoming fifth adventure in the Doodles series.",
				body: [
					"Doodles the American Philanthropist is currently in the creative stage, expanding the series' focus on giving back and community values.",
				],
			},
		],
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

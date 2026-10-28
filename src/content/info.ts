// Offline info pages. Privacy and TipFlip Terms are drafts for Nil to edit;
// "About me" is a placeholder until Nil writes it.
export type InfoPage = {
  title: string;
  intro?: string;
  sections: { heading?: string; body: string }[];
};

export const INFO_PAGES: Record<'about' | 'privacy' | 'terms', InfoPage> = {
  about: {
    title: 'About me and the app',
    sections: [
      {
        body: 'Placeholder: a few words about who made TipFlip and why will go here.',
      },
    ],
  },
  privacy: {
    title: 'Privacy guarantee',
    intro: 'TipFlip works entirely on your phone. No account, no internet connection, no tracking.',
    sections: [
      {
        heading: 'Everything stays on this phone',
        body: 'Your settings, your discount history and any signatures are stored only on this device.',
      },
      {
        heading: 'Nothing is sent anywhere',
        body: 'TipFlip has no servers. It collects no analytics, no personal data and no location, and it shares nothing with anyone, including me.',
      },
      {
        heading: "You're in control",
        body: 'Swipe a record in History to delete it and its signature, or use Clear All to delete everything. Uninstalling the app removes all of it.',
      },
      {
        heading: 'Links that leave the app',
        body: 'Rating the app or opening my website or TikTok takes you to those services, where their own privacy policies apply.',
      },
    ],
  },
  terms: {
    title: 'TipFlip Terms',
    intro: 'TipFlip is a parody app made for fun. By using it, you agree to these terms.',
    sections: [
      {
        heading: 'What TipFlip does',
        body: "TipFlip shows a discount screen to a waiter and saves the waiter's choice, the local date and time, and their signature if you require one. It does not process payments, calculate bills, contact restaurants or check that a discount is applied.",
      },
      {
        heading: 'No guaranteed discount',
        body: 'A TipFlip record is not a contract, a coupon or proof that anyone owes you anything. Whether you get a discount is up to the restaurant.',
      },
      {
        heading: 'How long records are kept',
        body: 'Records stay on your phone until you delete them in History or uninstall the app. Nobody else can see them, and deleted records cannot be recovered.',
      },
      {
        heading: 'Play nice',
        body: 'Use TipFlip with good humor. Be kind to restaurant staff, and tip fairly.',
      },
      {
        heading: 'No warranty',
        body: "TipFlip is provided as is, without warranties of any kind. To the extent the law allows, I'm not liable for anything that results from using it.",
      },
      {
        heading: 'Changes',
        body: 'These terms may change when the app is updated. The current version is always in the app.',
      },
    ],
  },
};

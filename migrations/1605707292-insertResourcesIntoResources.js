exports.up = async function (sql) {
  await sql`
    INSERT INTO resources
  (name, description, contact, image)
VALUES
('Calm Harm','Calm Harm is an award-winning app developed for teenage mental health charity stem4 by Dr Nihara Krause, Consultant Clinical Psychologist, using the basic principles of an evidence-based therapy called Dialectical Behavioural Therapy (DBT).','https://calmharm.co.uk/','calmharm.jpeg'),('Therapy Route','TherapyRoute.com is a clinician-run mental health resource and service directory.','https://therapyroute.com/','therapyroute.png'),('Urgent Mental Health Helpline','If you need help for a mental health crisis, emergency or breakdown, you should get immediate expert advice and assessment. This helpline provides 24-hour advice and support – for you, your child, your parent or someone you care for.','0131330','helpline1.png'),('MyLife','Find Your Quiet Place with MyLife. MyLife is an app that recommends the activities that are right for you. Whether you’re anxious, sleepless, hopeful, angry, or anything in between. Slay your stress, get more sleep or find your calm with short mindfulness activities tuned to your emotions.','https://my.life/','mylife.png'),('Beat Panic','The Beat Panic app uses a series of soothing coloured flashcards with messages designed to help you overcome a panic attack in a calm, gentle manner.','https://apps.apple.com/gb/app/beat-panic/id452656397','beatpanic.jpeg'),('PsyOnline','We are simplifying your search for the right therapist. No matter what type of counselling you are looking for, It’s offers a safe space to connect with a practitioner in person or for online counselling.','https://www.psyonline.at/wien','psyonline.png'),('Der Österreichische Bundesverband für Psychotherapie (ÖBVP)','Details to the Austrian Psychotherapy Law and list of psychotherapists.','https://www.psychotherapie.at/patientinnen/psychotherapeutinnen-suche','OEBVP.jpg'),('TelefonSeelsorge Österreich','Call our helpline or chat with us online
If calling is not for you. Our trained volunteers will read your messages and respond in real time, helping you work through what’s on your mind.','http://www.telefonseelsorge.at/home','seelsorge.png'),('pro mente Wien','Peer and group counselling provide support. Hearing from others with similar issues helps you see that you’re not alone in having challenges, whether you are grappling with panic attacks, depression, or another mental health issue. The members may also undertake specific activities, such as addressing certain fears and anxieties.','https://www.promente.wien/','promente.png'),('SPADE','Group sessions for people who suffer from panic attacks, anxiety or depression. SPADE is specialised in several types of mental health issues. ','https://spade.at/','spade.png'),('AA-Anonymen Alkoholiker Österreich / Südtirol','Alcoholics Anonymous is an international mutual aid fellowship with the stated purpose of enabling its members to "stay sober and help other alcoholics achieve sobriety." AA is nonprofessional, self-supporting, and apolitical. Its only membership requirement is a desire to stop drinking.','https://www.anonyme-alkoholiker.at/','aa.png'),('I Am Sober ','Mobile app to track your sobriety with a community that understands what you’re going through. Build new daily habits and learn from others who are making changes happen.','https://iamsober.com/','iamsober.png'),('Calm','Calm creates unique audio content that strengthens mental fitness and tackles some of the biggest mental health challenges of today: stress, anxiety, insomnia and depression. ','https://www.calm.com/','calm.png'),('Moodnotes','Don’t let your mood affect your life. Take control over it! Meet Moodnotes - a super easy mood tracker & journaling app to capture your mood and help you improve your thinking habits. Moodnotes empowers you to track your mood over time, avoid common thinking traps, and develop perspectives associated with increased happiness and well-being.','https://www.ustwo.com/work/moodnotes','moodnotes.jpg'),('Mindful Life','Mindfulness is an integrative, mind-body based approach that helps people to manage their thoughts and feelings and mental health.','https://mindfullife.at/kurse-seminare/','mindfullife.png'),('littlebig.art','We believe that arts are more joyful when shared with others. That’s why we bring together aspiring artists with audiences that are truly interested in what they do. With our platform, we give everyone access to distinct art experiences, no matter where, and provide more visibility to aspiring artists and their artworks.','https://www.littlebig.art/','littlebigart.png'),('VAEV','VAEV is a non-governmental organization established in Wien to delivers programmes of community based activities to young people from areas of high social deprivation. Community activities take the form of physical activities, group work, volunteering, employability and personal development sessions.','https://vaev.at/','vaev.jpg');
  `;
};

exports.down = async function (sql) {
  await sql`
    DELETE FROM resources;
  `;
};

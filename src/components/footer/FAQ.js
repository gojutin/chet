import React from 'react';

const FAQS = [
      {
        q: "Do I have to sign in to use Chet?",
        a: "Nope. Chet is available for anyone to use. However, logging in is required to create and train your own chatbot. You can log in with Google, Facebook, Twitter, or Github.",
      },
      {
        q: "What is the difference between Chet and my chatbot?",
        a: "They both process information and generate responses in exactly the same way and both begin their existense with no concept of language. The difference is that Chet is available to the public and has been learning for a while now, while your chatbot is brand new and doesn't know anything. Chet and your chatbot do not share any information.",
      },
       {
        q: "Does my chatbot remember our conversations?",
        a: "Yup. Your chatbot remembers every conversation and gets a little bit smarter with each exchange. At first, the responses may not make much sense, but you should see them improve over time. Of course, you can always wipe your chatbot's mind and start over at any time.",
      },
    ];

export default () =>
  <div>
    { FAQS.map(({ q, a }) =>
      <div key={q}>
        <h5 className="text-primary">{q}</h5>
        <p>{a}</p>
        <hr />
      </div>
    )}
  </div>
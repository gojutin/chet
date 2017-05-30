import React from 'react';

const aboutItems = [
  {
    icon: "fa-moon-o",
    title: "Light or dark theme",
    info: "Toggle between a light or dark themed background. Dark theme is the default from 7:00PM to 7:00AM.",
  },
  {
    icon: "fa-user-circle-o",
    title: "Login",
    info: "Create and train your own chatbot.",
  },
  {
    icon: "fa-cog",
    title: "Settings",
    subtitle: "( requires login )",
    info: "Toggle between Chet and your chatbot. Give your chatbot a name or a color, see it's stats, wipe it's mind or set access with parental settings.",
  },
  {
    icon: "fa-tasks",
    title: "Conversation view",
    info: "Toggle between a single response view or a full conversation view. The conversation is cleared any time you switch between Chet and your chatbot or when the page is reloaded."
  },
  {
    icon: "fa-info-circle",
    title: "Stats",
    subtitle: "( in conversation view )",
    info: "View a detailed description of how the latest input was processed and response was generated.",
  },
];

const AboutItem = ({icon,title, subtitle, info}) => (
  <div>
    <i className={`fa fa-2x text-warning ${icon}`} />
      <h5 className="text-primary">{title}</h5>
      { subtitle &&
        <p>{subtitle}</p>
      }
      <p>{info}</p>
    <hr />
  </div>
)

export default () => 
  <div>
    {aboutItems.map(item => <AboutItem {...item} />)}
  </div>
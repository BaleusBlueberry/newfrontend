const About = () => {
  return (
    <div className="px-6 py-12 max-w-4xl mx-auto text-center">
      <h1 className="text-4xl font-bold mb-6">About Clash of Clans Helper</h1>
      <p className="text-lg mb-4 leading-relaxed">
        Welcome to the <span className="font-bold">Clash of Clans Helper</span>,
        your ultimate companion for strategizing and planning upgrades in the
        game. This tool is designed to streamline your decision-making process
        and help you focus on what matters most: upgrading and managing your
        village effectively.
      </p>
      <p className="text-lg mb-6 leading-relaxed">
        Our site offers dedicated pages for{" "}
        <span className="font-bold">Town Halls</span> and various building
        types, making it easier than ever to navigate through your options.
        Simply click on a Town Hall level to access a tailored selection page
        that filters exactly what you need for that level.
      </p>
      <div className="rounded-lg p-6 shadow-lg mb-6">
        <h2 className="text-2xl font-semibold mb-4">Building Categories</h2>
        <p className="text-lg leading-relaxed">
          Dive into detailed information about different building types. Each
          building has its own dedicated page that provides essential details
          like <span className="font-bold">levels</span> and{" "}
          <span className="font-bold">upgrade times</span>. From defensive
          structures to resource-generating buildings, you have all the data you
          need at your fingertips.
        </p>
      </div>
      <div className="rounded-lg p-6 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Personalized Experience</h2>
        <p className="text-lg leading-relaxed">
          Logged-in users can enjoy an enhanced experience by saving their
          favorite buildings. Simply click the{" "}
          <span className="font-bold">star button</span> next to any building to
          add it to your personal favorites list for quick access later.
        </p>
      </div>
      <footer className="mt-12">
        <p>
          Thank you for choosing Clash of Clans Helper. Start exploring and
          optimizing your village today!
        </p>
      </footer>
    </div>
  );
};

export default About;

function About() {
  return (
    <article className="w-3/4 mx-auto">
      <h1 className="text-center text-3xl mb-10">About</h1>
      <p>
        <strong>pianoo</strong> is a web app where you can play piano
         (and a few other instruments) with your computer keyboard, easily and breezily. 
         It&#39;s mainly targeted at those who don&#39;t know much about music.
         May it brings you some relaxation and fun.</p>
      
      <div className="my-32 rounded p-4 bg-th-hover">
        <p>🚧 This project is still in it&#39;s early stage of development,
          many features are still missing.</p>
        <p>If you are interested, you can check the development progress on
          <a href="https://github.com/users/isunjn/projects/1" 
            className="underline mx-2">github-project-page</a>
        </p>
      </div>
    </article>
  );
}

export default About;

import ModuleProvider from '../ModuleProvider';

export default class PunsModuleProvider extends ModuleProvider {
  /**
   * Assing the command keyword
   *
   */
  commands() {
    return ['pun'];
  }


  /**
   * Register the module provider
   *
   */
  register(box, builder) {
    builder
      .respond()
      .text('There you go, <@1>')
      .mention(box.user())
      .attach((attachment) => {
        return attachment
          .danger()
          .text(this.pun())
      }.bind(this))
      .send();
  }


  /**
   * Return a random pun
   *
   */
  pun() {
    let puns = [
      "I can't believe I got fired from the calendar factory. All I did was take a day off.",
      "How did I escape Iraq? Iran.",
      "Why was Cinderella thrown off the basketball team? She ran away from the ball.",
      "I wasn't originally going to get a brain transplant, but then I changed my mind.",
      "I'd tell you a chemistry joke but I know I wouldn't get a reaction.",
      "I'm glad I know sign language, it's pretty handy.",
      "I'm reading a book about anti-gravity. It's impossible to put down.",
      "When I get naked in the bathroom, the shower usually gets turned on.",
      "I'm emotionally constipated. I haven't given a shit in days.",
      "A friend of mine tried to annoy me with bird puns, but I soon realized that toucan play at that game.",
      "Did you hear about the guy who got hit in the head with a can of soda? He was lucky it was a soft drink.",
      "My first job was working in an orange juice factory, but I got canned: couldn't concentrate.",
      "What was Forrest Gump's email password? 1forrest1",
      "I wanna make a joke about sodium, but Na..",
      "Thieves had broken into my house and stolen everything except my soap, shower gel, towels and deodorant. Dirty Bastards.",
      "A book just fell on my head. I've only got myshelf to blame.",
      "Why did the scientist install a knocker on his door? He wanted to win the No-bell prize!",
      "I am on a seafood diet. Every time I see food, I eat it.",
      "Having sex in an elevator is wrong on so many levels.",
      "I hate insects puns, they really bug me.",
      "I'm no photographer, but I can picture us together.",
      "What do prisoners use to call each other? Cell phones.",
      "I was going to give him a nasty look, but he already had one.",
      "Atheism is a non-prophet organization.",
      "My math teacher called me average. How mean!",
      "How can you spot the blind guy at the nudist colony? It's not hard.",
      "Did you hear about the Italian chef with a terminal illness? He pastaway.",
      "I am so poor I can't even pay attention.",
      "What do you call people who are afraid of Santa Claus? Claustrophobic",
      "A hole was found in the wall of a nudist camp. The police are looking into it."
    ];

    return puns[Math.floor(Math.random() * puns.length)];
  }
}

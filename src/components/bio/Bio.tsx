import styles from "./Bio.module.css";

export default function Bio() {
  return (
    <>
      <div className={styles.text + " " + "p20"}>
        <img src="/image/photo1c.png" alt="biophoto" />
        <h2 className="py10">PAST</h2>
        <p>
          Was born in Moscow in a family of physicists and engineers in the
          early 90s. Studied at the department of computer music of a modern
          music school in the 2000s and exactly in this place I got my first
          communication experience with a synthesizer and electronic music. My
          favorite schoolwork was musical modeling, where we studied how to turn
          graphic and natural objects into musical works. Miracles in encoding
          and decoding sound reality happened there, such as the transformation
          of a bee or storm, for example, into a musical form like a piano trio.
        </p>
        <h2 className="py10">SEARCH</h2>
        <p>
          When I was 18 I received my first independent musical experience as an
          artist in an avant-garde project connected with rock/metal music and
          the local underground. At this point, the main instrument for me was a
          saxophone, and I also started to learn how to use field recordings.
          The name of the project{" "}
          <a href="https://thecrawlingchaos.bandcamp.com/">
            “The Crawling Chaos”
          </a>{" "}
          was inspired by the Lovecraftian Universe. At that time my brother
          rented rehearsal space, where we mixed noise parts with non-stop
          jam-sessions. Then my first album-collaboration (released only in
          2017, when I finally started my own project){" "}
          <a href="https://zhavoronskaya.bandcamp.com/album/sputnik-lell-22">
            Sputnik LELL-22
          </a>{" "}
          appeared, named after the Soviet synthesizer.
          <br />
          During this period I began to clearly articulate my interests in
          music. I realized that cross-genre and eclecticism are the most
          interesting for me. I like to mix synthetic sound with analog,
          inserting elements of field recordings into sound and trying to find
          rare and strange combinations.
        </p>
        <h2 className="py10">SOLO</h2>
        <p>
          My first solo-project started in Kyiv in 2017. The first time, its
          slogan was 'Noise against war'. It was conceptual noise with an active
          anti-war agenda. Through this project, I critically rethought conquest
          policy. I worked a lot with video at that time. And my interest in
          thematic samples and experimental electronics had already started to
          emerge. Noise began to move into the background. Piece by piece I
          started to expand my thematic repertoire. Not only war, but various
          internal states of a person also began to interest me, especially how
          I can convert them to music. I often work with text, recording my
          observations about this world on an audio-recorder. The birth of
          several albums is the result of these observations:{" "}
          <a href="https://zhavoronskaya.bandcamp.com/album/zhavoronskaya-r">
            'R'
          </a>
          , <a href="https://zhavoronskaya.bandcamp.com/album/pcp">'PCP'</a>,{" "}
          <a href="https://zhavoronskaya.bandcamp.com/album/zhavoronskaya-neurotransmission-ep">
            'neurotransmission'
          </a>
          ,{" "}
          <a href="https://zhavoronskaya.bandcamp.com/album/gone-beyond-remastered-white-half-moon">
            'White half moon'
          </a>
          ,{" "}
          <a href="https://zhavoronskaya.bandcamp.com/album/i-dream-in-dreams">
            'i dream in dreams'.
          </a>
        </p>
        <h2 className="py10">NOWADAYS</h2>
        <p>
          As a result of my love for interdisciplinarity, music and its visual
          accompaniment are an alliance of science, technology, and art.
          <br />
          Now generative art is becoming more and more enjoyable for me, as an
          opportunity to work with new languages and algorithms, as well as to
          combine the knowledge of a programmer and musical creativity.
        </p>
      </div>
    </>
  );
}

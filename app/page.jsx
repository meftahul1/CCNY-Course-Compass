import Feed from '../components/Feed'

export default function Home() {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center"> Discover &nbsp;
        <br className="max-md:hidden" />
        <span className="blue_gradient text-center pt-8 mt-4">Courses, Course Mates and Many More!</span>
      </h1>
      <p className="desc text-center">
        Learn more about your courses and connect with your classmates with our platform. Dive into detailed course information, track your progress and engage with fellow students to enhance your learning experience and build valuable connections
      </p>

      <Feed />

    </section>
  );
}

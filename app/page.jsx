import Feed from '../components/Feed'

export default function Home() {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center"> Discover &nbsp;
        <br className="max-md:hidden" />
        <span className="blue_gradient text-center pt-8 mt-4">Courses, Course Mates and Many More!</span>
      </h1>
      <p className="desc text-center">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas veniam vitae expedita amet eaque ea iure error dicta architecto aliquam dignissimos maiores exercitationem, deleniti officia consequatur aspernatur? Dolor, nihil repellendus?
      </p>

      <Feed />

    </section>
  );
}

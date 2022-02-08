import { getAllPagesWithSlug , getPageAndMorePages  } from '../lib/dato'
import ListPages from '../components/ListPages-with-image';
import PageHeader from '../components/PageHeader';

//If a page has Dynamic Routes and uses getStaticProps, it needs to define a list of paths to be statically generated.
export async function getStaticPaths() {
  const allPages = await getAllPagesWithSlug();
  return {
    paths: allPages?.map((page) => `/${page.permalink}`),
    fallback: false,
  };
}

//If you export a function called getStaticProps (Static Site Generation) from a page, Next.js will pre-render this page at build time using the props returned by getStaticProps.
export async function getStaticProps({ params, preview = false }) {

const data = await getPageAndMorePages(params.permalink, preview)
  
  return {
    props: {
      preview,
      page: {
        ...data?.page
      },
      morePages: data?.morePages ?? [], /*The nullish coalescing operator (??) is a logical operator that returns its right-hand side operand when its left-hand side operand is null or undefined, and otherwise returns its left-hand side operand.*/
    },
  };
}


export default function Page({ preview, page, morePages }) {

  return (
    <>
      <PageHeader title={page.title} intro={page.strapLine} coverImage={page.backgroundImage.responsiveImage} />
      {morePages.length > 0 && <ListPages pages={morePages} />}
    </>
     
  )
}
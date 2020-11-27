import GitApi from "../../lib/GitApi";
import ReactMarkdown from "react-markdown";
import useSWR from "use-swr";
import FrontEndLayout from "../../components/FrontEndLayout";
import getRepo from "../../lib/getRepo";

let fetchPost = async (name) => fetch(`/api/content?filePath=${name}`)
  .then(r => r.json())
  .then((r) => {
    return r.content;
})
function Post(props) {
  let { data } = useSWR(props.name ? props.name : Error, fetchPost,  { initialData: props.post });
    return (
        <FrontEndLayout title={props.post.title}>
            <ReactMarkdown source={data ? data.content : props.post.content} />
        </FrontEndLayout>
    )
}
  
  // This function gets called at build time
export async function getStaticPaths() {
    let repo = getRepo();

    let git = GitApi(repo, "master");
    const files = await git.getFiles(undefined, 'md');
    // Get the paths we want to pre-render based on posts
    const paths = files.map((file) => ({
      params: { name: file.name.replace('.md', '') },
    }))
  
    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false }
  }
  
  // This also gets called at build time
export async function getStaticProps({ params }) {
    let repo = getRepo();
    let git = GitApi(repo, "master");
    let { name } = params;
    let post = await git.getFile(`${name}.md`);
    // Pass post data to the page via props
    return { props: { post,name } }
  }
  
  export default Post
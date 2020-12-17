import { FC, useEffect } from "react";
import { Garden } from "../../types";
import GardenerService from "../services/GardenerService";

        
const Page: FC<{
    gardenFound: boolean;
    redirect: string;
}> = ({
    gardenFound,
    redirect,
})  => {
    //Should trigger redirect
    useEffect(() => {
        if (gardenFound && window) {
            //@ts-ignore
            window.location = redirect;
        }
    }, [gardenFound]);
    //else button
    return (
        <div>
            {gardenFound ? (
                <a href={redirect}>Login With Github</a>
            ) : <p>Garden Not Found :(</p>}
        </div>
    )
}

export async function getServerSideProps({ query }) {
    const clientId = process.env.GITHUB_ID
    const { publicKey } = query;
    let redirect = `https://github.com/login/oauth/authorize?client_id=${clientId}&state=${publicKey}`;
    
    const service = new GardenerService();
    let garden: Garden | undefined = undefined;

    try {
        garden = await service.getGarden(publicKey)
        return {
            props: {
                gardenFound: true,
                redirect
            }
        }
    } catch (e) {
        console.log(e);
        return {
            props: {
                gardenFound: false,
                redirect
            }
        }
    }
    return {
        props: {
            publicKey,
            gardenFound: false,
            redirect
        }
    }
}

export default Page;
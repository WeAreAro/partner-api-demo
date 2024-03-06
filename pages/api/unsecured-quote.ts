import type {NextApiRequest, NextApiResponse} from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const result = await sendPayload(req.body)

        res.status(200).send({result})
    } catch (err) {
        res.status(500).send({error: 'failed to fetch data'})
    }
}

const sendPayload = async (payload: any) => {
    const url = "/ff-api/partner/v1/quote"
    const myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + process.env.API_BEARER_TOKEN);

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: payload,
    };

    const response = await fetch(url, requestOptions);
    const result = await response.json();

    return result
}


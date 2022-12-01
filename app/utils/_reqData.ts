export default function getReqData(req: any) {
    return new Promise((resolve, reject) => {
        try {
            let body: any = "";
            req.on("data", (chunk: any) => {
                body += chunk.toString();
            });
            req.on("end", () => {
                resolve(body);
            });
        } catch (error) {
            reject(error);
        }
    });
}
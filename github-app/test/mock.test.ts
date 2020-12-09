const fixtures = require("@octokit/fixtures");
//https://github.com/octokit/fixtures

import nock from "nock";
import fetch from "cross-fetch";

describe("Mocking with nock", () => {
	beforeEach(() => {
		nock.disableNetConnect();
		nock("https://randomuser.me").get("/api/").reply(200, { name: "Roy" });
	});
	//https://codeburst.io/testing-mocking-http-requests-with-nock-480e3f164851
	test("I know how to mock with nock", async () => {
		const r = await fetch("https://randomuser.me/api/").then((r) => r.json());
		expect(r.name).toBe("Roy");
	});
});

describe("Mocking with nock and @octokit/fixtures", () => {
	let mock: any;
	beforeEach(() => {
		nock.disableNetConnect();
		mock = fixtures.mock("api.github.com/get-repository");
	});
	//https://codeburst.io/testing-mocking-http-requests-with-nock-480e3f164851
	test("I know how to mock with nock", async () => {
		const r = await fetch(
			"https://api.github.com/repos/octokit-fixture-org/hello-world",
			{
				method: "get",
				headers: {
					Accept: "application/vnd.github.v3+json",
					Authorization: "token 0000000000000000000000000000000000000001",
				},
			}
		)
			.then((r) => r.json())
			.catch(() => {
				mock.explain;
			});
		expect(r.forks).toBe(42);
	});
});

// Name: Website Tools
// Description: Tools for maintaining my website (dschapman.com)
// Author: Daniel Chapman
// Twitter: @ds_chapman
import "@johnlindquist/kit"

let website_content = "/Users/danielchapman/Library/Mobile Documents/iCloud~md~obsidian/Documents/dschapman-com-content"
let website_notes = "/Users/danielchapman/Library/Mobile Documents/iCloud~md~obsidian/Documents/My notes"
let website_dir = "/Users/danielchapman/github/dschapman/dschapman-com"

let today = Date()
let output = []
let input = await arg("Select an Option", [{ name: "Publish", description: "Update the git repositories necessary to publish an update to my website", value: "Publish" }, { name: "Open Website in VSCode", description: "Open a vscode environment for dschapman-com", value: "VSCode" }, { name: "Edit Website Content", description: "Open the website's content in Obsidian", value: "Edit Website Content" }, { name: "Open Website", description: "Open https://dschapman.com in the browser", value: "Open Website" }, { name: "View on Github", description: "View website code on Github", value: "Github" }].sort((a, b) => { return (a.name > b.name ? 1 : -1) }))

switch (input) {
    case "Publish":
        input = await arg("Publish", [{ name: "Website Content", description: "Publish any changes to poems, articles or blog posts", "value": "Website Content" }, { name: "Website Notes", description: "Publish any changes to public notes", value: "Website Notes" }, { name: "All Content", description: "Publish it all", value: "All Content" }])
        // -C allows git to be run from any directory
        switch (input) {
            case "Website Content":
                output.push(await exec(`git -C "${website_content}" add -A`))
                output.push(await exec(`git -C "${website_content}" commit -m "Publish content: ${today.toString()}"`))
                output.push(await exec(`git -C "${website_content}" push`))
                output.push(await exec(`git -C "${website_dir}" submodule update --remote`))
                output.push(await exec(`git -C "${website_dir}" add dschapman-com-content`))
                output.push(await exec(`git -C "${website_dir}" commit -m "Publish content: ${today.toString()}"`))
                output.push(await exec(`git -C "${website_dir}" push`))
                break;
            case "Website Notes":
                output.push(await exec(`git -C "${website_notes}" add -A`))
                output.push(await exec(`git -C "${website_notes}" commit -m "Publish content: ${today.toString()}"`))
                output.push(await exec(`git -C "${website_notes}" push`))
                output.push(await exec(`git -C "${website_dir}" submodule update --remote`))
                output.push(await exec(`git -C "${website_dir}" add My-notes`))
                output.push(await exec(`git -C "${website_dir}" commit -m "Publish notes: ${today.toString()}"`))
                output.push(await exec(`git -C "${website_dir}" push`))
                break;
            case "All":
                output.push(await exec(`git -C "${website_content}" add -A`))
                output.push(await exec(`git -C "${website_content}" commit -m "Publish content: ${today.toString()}"`))
                output.push(await exec(`git -C "${website_content}" push`))
                output.push(await exec(`git -C "${website_notes}" add -A`))
                output.push(await exec(`git -C "${website_notes}" commit -m "Publish content: ${today.toString()}"`))
                output.push(await exec(`git -C "${website_notes}" push`))
                output.push(await exec(`git -C "${website_dir}" submodule update --remote`))
                output.push(await exec(`git -C "${website_dir}" add My-notes dschapman-com-content`))
                output.push(await exec(`git -C "${website_dir}" commit -m "Publish all content: ${today.toString()}"`))
                output.push(await exec(`git -C "${website_dir}" push`))
                break;
            default:
                break;
        }
        break;
    case "VSCode":
        exec(`code "${website_dir}"`);
        break;
    case "Edit Website Content":
        input = await arg("Open", [{ name: "Articles, Poems, and Blog Posts", value: "content" }, { name: "Digital Notes", value: "notes" }])
        switch (input) {
            case "content":
                console.log("Content")
                browse(`"obsidian://open?vault=dschapman-com-content"`)
                break;
            case "notes":
                console.log("Notes")
                browse(`"obsidian://open?vault=My%20notes"`)
                break;
            default:
                break;
        }
    case "Open Website":
        browse("https://dschapman.com")
        break;
    case "Github":
        browse("https://github.com/dschapman/dschapman-com")
        break;
    default:
        break;
}
output.forEach(item => {
    if (item.stdout)
        console.log(item.stdout)
})


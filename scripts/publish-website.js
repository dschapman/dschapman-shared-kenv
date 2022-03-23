// Name: Publish Website
// Description: Update the git repositories necessary to publish an update to my website.
// Author: Daniel Chapman
// Twitter: @ds_chapman
import "@johnlindquist/kit"

let website_content = "/Users/danielchapman/Library/Mobile Documents/iCloud~md~obsidian/Documents/dschapman-com-content"
let website_notes = "/Users/danielchapman/Library/Mobile Documents/iCloud~md~obsidian/Documents/My notes"
let website_dir = "/Users/danielchapman/github/dschapman/dschapman-com"

let today = Date()
let output
let input = await arg("Publish:", [{ name: "Website Content", description: "Publish any changes to poems, articles or blog posts", "value": "Website Content" }, { name: "Website Notes", description: "Publish any changes to public notes", value: "Website Notes"  }, {name: "All Content", description:"Publish it all", value: "All Content"}])
// -C allows git to be run from any directory
switch (input) {
    case "Website Content":
        output = await exec(`git -C "${website_content}" add -A`)
        console.log(output.stdout)
        output = await exec(`git -C "${website_content}" commit -m "Publish content: ${today.toString()}"`)
        console.log(output.stdout)
        output = await exec(`git -C "${website_content}" push`)
        console.log(output.stdout)
        output = await exec(`git -C "${website_dir}" submodule update --remote`)
        console.log(output.stdout)
        output = await exec(`git -C "${website_dir}" add dschapman-com-content`)
        console.log(output.stdout)
        output = await exec(`git -C "${website_dir}" commit -m "Publish content: ${today.toString()}"`)
        console.log(output.stdout)
        output = await exec(`git -C "${website_dir}" push`)
        console.log(output.stdout)
        break;
    case "Website Notes":
        await exec(`git -C "${website_notes}" add -A`)
        await exec(`git -C "${website_notes}" commit -m "Publish content: ${today.toString()}"`)
        await exec(`git -C "${website_notes}" push`)
        await exec(`git -C "${website_dir}" submodule update --remote`)
        await exec(`git -C "${website_dir}" add My-notes`)
        await exec(`git -C "${website_dir}" commit -m "Publish notes: ${today.toString()}"`)
        await exec(`git -C "${website_dir}" push`)
        break;
    case "All":
        await exec(`git -C "${website_content}" add -A`)
        await exec(`git -C "${website_content}" commit -m "Publish content: ${today.toString()}"`)
        await exec(`git -C "${website_content}" push`)
        await exec(`git -C "${website_notes}" add -A`)
        await exec(`git -C "${website_notes}" commit -m "Publish content: ${today.toString()}"`)
        await exec(`git -C "${website_notes}" push`)
        await exec(`git -C "${website_dir}" submodule update --remote`)
        await exec(`git -C "${website_dir}" add My-notes dschapman-com-content`)
        await exec(`git -C "${website_dir}" commit -m "Publish all content: ${today.toString()}"`)
        await exec(`git -C "${website_dir}" push`)
        break;
    default:
        break;
}


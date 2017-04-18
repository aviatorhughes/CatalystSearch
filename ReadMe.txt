Hello!

Notes: 

Application built using Visual Studio Professional 2015 Update 3, 

with .net framework 4.5, Knockout js, TypeScript, sql database in mdf file in the App_Data folder of the CatalystSearch.UI project. 


Building info:

After pushing it to Git, I tried cloning it on couple other machines to make sure it runs when hit the play button on your visual studio but encountered the below issue:

 - On another laptop with Visual Studio 2015 Professional, and no typescript, I had to install TypeScript for Visual Studio 2015 from this link - https://www.microsoft.com/en-us/download/details.aspx?id=48593. 

I later added npm package.json file to the UI project and included TypeScript in the devDependencies. So, if it doesn't automatically pick it up and restore the packages for some reason, please install TypeScript from above link. 

# Graphical Display of Tables

Here we will document how you can get the results of your [Data Collection](https://github.com/Ari-Glikman/DataCollection) to be displayed graphically. The output of your project will look like this:

![image](https://github.com/Ari-Glikman/DataCollection-UI/assets/73805987/60fc9294-d2a7-4e26-a388-d98a878adff9)

Note that I am working on a local machine. If you are doing this on a server then be aware to use the correct IP address.

If you haven't done so yet, we will import the three classes from the [Data Analysis] repository that we are going to need:

[Sample.DBExpansion.Util.REST.disp.cls](https://github.com/Ari-Glikman/DataAnalysis/blob/main/src/Sample/DBExpansion/Util/REST/disp.cls)

[Sample.DBExpansion.Util.REST.impl.cls](https://github.com/Ari-Glikman/DataAnalysis/blob/main/src/Sample/DBExpansion/Util/REST/impl.cls)

[Sample.DBExpansion.Util.REST.spec.cls](https://github.com/Ari-Glikman/DataAnalysis/blob/main/src/Sample/DBExpansion/Util/REST/spec.cls)

You can take the [xml](https://github.com/Ari-Glikman/DataCollection-UI/blob/main/Importable/REST.xml) and import it to your system.

The spec will actually create the dispatch class and implementation template. If you're interested in learning more about this process check out my colleague's, Eduard Lebedyuk, great [article](https://community.intersystems.com/post/developing-rest-api-spec-first-approach).


## Set up the APIs
Note that in this demo we will be using unauthenticated access. We also assume that there is already data in the Sample_DBExpansion_Data.DBAnalysisInfo and Sample_DBExpansion_Data.GlobalAnalysisInfo tables. If there isn't then go back to [Data Collection](https://github.com/Ari-Glikman/DataCollection) and get some data.

1. Let's first create an endpoint which will give us access to our data:
![image](https://github.com/Ari-Glikman/DataCollection-UI/assets/73805987/8da97973-ac8d-45be-9c9f-ec355910f1f6)

Fill in the same names unless you plan to customize the code for the react app on your own.

2. Click save and let's test our APIs. Open up postman, and send the following request (make sure you use the proper authorization):
![image](https://github.com/Ari-Glikman/DataCollection-UI/assets/73805987/be2d2bb5-3295-477e-9e1c-0b016f76067c)

Our output should look something like this:

```
{
    "data": [
        {
            "Name": "c:\\intersystems\\irishealth\\mgr\\training\\",
            "Date": "2023-04-30 15:23:58",
            "DBUsedSize": 2010,
            "DBAllocSize": 2060
        },
        {
            "Name": "c:\\intersystems\\irishealth\\mgr\\training\\",
            "Date": "2023-05-01 09:01:42",
            "DBUsedSize": 2010,
            "DBAllocSize": 2060
        },
        {
            "Name": "c:\\intersystems\\irishealth\\mgr\\training\\",
            "Date": "2023-05-03 13:57:40",
            "DBUsedSize": 150,
            "DBAllocSize": 2060
        }
    ]
}
```

Next let's send a GET request to ```http://localhost:52776/Sample/dbAnalysis/globals/all```. Check that your response gives you a list of globals who's information looks like this:
(note that the name will default to the class name if the global has one)
```
        {
            "Name": "someName.cls",
            "UsedMB": 4.2,
            "AllocatedMB": 5.7
        }
```

Now let's test a specific global, say Errors. Send a GET request ```http://localhost:52776/Sample/dbAnalysis/global/Errors```. Check that your output is similar to this:
```
        {
            "Name": "ERRORS",
            "UsedMB": 0.4,
            "Date": "2023-04-30 15:23:58",
            "AllocatedMB": 0.45
        },
        {
            "Name": "ERRORS",
            "UsedMB": 0.43,
            "Date": "2023-05-01 09:01:42",
            "AllocatedMB": 0.49
        },
        {
            "Name": "ERRORS",
            "UsedMB": 0.1,
            "Date": "2023-05-03 13:57:40",
            "AllocatedMB": 0.13
        }
```
And finally, let's send a GET request to ```http://localhost:52776/Sample/dbAnalysis/globals/table/1000```
This will give us the growth of globals, who's output we will channel into the 'Tabled Data' section of the react-app. Note that the 1000 is just referring to how many days back we should go. This is entirely up to you. Feel free to customize this in the [src/components/TableInputBar.js](https://github.com/Ari-Glikman/DataCollection-UI/blob/main/src/components/TableInputBar.js) file. Note the 
```<Table timeBack={1000} numGlobals={searchInput}/>```. Put in to here however many days you wish to see back on the react app.

You should get a response that is a list of objects like this one:
```
       {
            "Name": "nameOfGlobal",
            "ClassName": "AriTesting.DemoTableElad.cls",
            "OldMB": 0.14,
            "OldDate": "2023-04-30 15:23:58",
            "NewMB": 0.14,
            "NewDate": "2023-05-03 13:57:40",
            "Change": "0"
        }
```


Since all our requests were in order we can now create our web app. Note that if you were not getting the responses you were expecting then you should go back and see what is wrong, before moving on and creating the app that depends on them. 

## Steps For Creating the Web App
1. The first thing you will do is create a generic react app. Note that you will need to have node (at least version 14) installed on the local development machine, however you will not need it on the server. If you don't have it installed, do so [here](https://nodejs.org/en/download). If you are not sure if you have it installed you can run this command from your terminal:
```
node --version
``` 

2. Let's now install a generic react app, and we will change the parts that we will need to. This is as simple as running:
```
npx create-react-app data-collection-graphs
```

3. If this is your first time doing this it may take a few minutes. Once it is done we will have a folder that looks as follows:
![image](https://github.com/Ari-Glikman/DataCollection-UI/assets/73805987/0b637f0a-238f-4c3b-9162-b3cb565e0333)

4. Your generic (we will customize it) react-app is now working. Check it out:
```
npm start
```
You should automatically be redirected to a tab that shows you the following (if not, go to http://localhost:3000/):
![image](https://github.com/Ari-Glikman/DataCollection-UI/assets/73805987/a9de547f-c657-44bf-8d98-c0bc86f8c25d)

5. Now let's customize for our needs. Stop your app from the terminal with ^C. Download the src folder in this repository and replace the one in your directory that was automatically created by our previous commands. From within the data-collection-graphs directory, install chart-js and react-chartjs-2 as follows:
```
npm install --save chart.js
```
```
npm install --save react-chartjs-2
```

6. Use ```npm start``` to load your page, and you should now get the page with your database analytics.

Feel free to play around with the code and make improvements or customizations that would suit your organization best!
   

If you have any suggestions on how I can improve this from our end please let me know as well :)

Shoot me an email: ari.glikman@intersystems.com

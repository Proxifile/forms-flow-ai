/*
Custom logic for submit action from step 1 - 9.30-property-eligibility-step-1-for-DEMO-(manchi)

var bearerToken;
var processId;
var apiCall = ({ url, method, headers, handleResponse, handleBeforeResponse, ...paramsObj }) => {
    fetch(url, {
        method,
        headers,
        ...paramsObj
    })
        .then(response => {
            if (handleBeforeResponse) { handleBeforeResponse(response.json()) }
            else
                return response.json()
        })
        .then(json => {
            if (handleBeforeResponse) { handleBeforeResponse() }
            handleResponse(json)
        });
}
const getToken = () => {
    apiCall({
        url: "http://10.2.50.133:8080/auth/realms/forms-flow-ai/protocol/openid-connect/token",
        method: "POST",
        body: "username=formsflow-designer%40example.com&password=changeme&grant_type=password&client_id=forms-flow-bpm&client_secret=df899985-70f2-4566-89c5-b6b730ab5d8e",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        handleResponse: (res) => {
            form.loading = true;
            bearerToken = 'Bearer' + res.access_token
            startProcess()
        }
    })
}
const startProcess = () => {
    apiCall({
        url: "http://10.2.50.133:8000/camunda/engine-rest/process-definition/key/Step_1_demo_create_user/start",
        method: "POST",
        headers: {
            'Content-Type': "application/json;charset=UTF-8",
            "Authorization": bearerToken,
        },
        body: JSON.stringify({
            "variables": {
                "state": { "value": data.state, "type": "String" },
                "isCommercialProperty": { "value": data.isCommercialProperty, "type": "String" },
                "email": { "value": data.yourEmail, "type": "String" }
            }
        }),
        handleResponse: (res) => {
            processId = res.id
            localStorage.setItem("email", data.yourEmail)
            localStorage.setItem("data", data)
            getTasks()
        }
    })
}
const getTasks = () => {
    apiCall({
        url: "http://10.2.50.133:8000/camunda/engine-rest/task?processInstanceId=" + processId,
        method: "GET",
        headers: {
            'Content-Type': "application/json;charset=UTF-8",
            "Authorization": bearerToken,
        },
        handleResponse: (res) => {
            if (res[0].name === "Step-2" || res[0].name === "Step-5") {
                getTaskVariables(res)
            }
            else {
                setTimeout(getTasks(), 1000)
            }
        }
    })
}
const getTaskVariables = (task) => {
    apiCall({
        url: "http://10.2.50.133:8000/camunda/engine-rest/task/" + task[0].id + "/variables",
        headers: {
            'Content-Type': "application/json;charset=UTF-8",
            "Authorization": bearerToken,
        },
        method: "GET",
        handleResponse: (res) => {
            completeProcess({ response: res, taskId: task[0].id })
        }
    })
}
const completeProcess = ({ response, taskId }) => {
    apiCall({
        url: "http://10.2.50.133:8000/camunda/engine-rest/task/" + taskId + "/complete",
        headers: {
            'Content-Type': "application/json;charset=UTF-8",
            "Authorization": bearerToken,
        },
        method: "POST",
        handleBeforeResponse: (res) => {
            submitForm(response)
        }
    })
}
getToken()
const CreateForm = (res, response) => {
    apiCall({
        url: "http://10.2.50.133:5000/application/create",
        method: "POST",
        body: JSON.stringify({
            formId: "614d8e6d6d2e501f3f06ab67",
            formUrl: "http://10.2.50.133:3000/form/614d8e6d6d2e501f3f06ab67/submission/" + res._id,
            submissionId: res._id
        }),
        headers: {
            'Content-Type': "application/json;charset=UTF-8",
            "Authorization": "Bearer " + localStorage.getItem("authToken"),
        },
        handleResponse: () => {
          form.loading = false;
            if (response && response.form_name && response.form_name.value === "Form2")
                location.assign("http://10.2.50.133:3000/form/614da1396d2e50310706ab77")
            else if (response && response.form_name && response.form_name.value === "Form5")
                location.assign("http://10.2.50.133:3000/form/614d9c336d2e5081a306ab6d")
        }
    })
}
let date = new Date()
let metadata = {
    browserName: window.navigator.appName,
    // offset : abs(date.getTimezoneOffset()),
    offset: 330,
    onLine: window.navigator.onLine,
    origin: "http://10.2.50.133:3000",
    pathName: "/form/614d8e6d6d2e501f3f06ab67",
    referrer: "",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    userAgent: window.navigator.userAgent
}
const submitForm = (response) => {
    apiCall({
        url: "http://10.2.50.133:3001/form/614d8e6d6d2e501f3f06ab67/submission",
        method: "POST",
        body: JSON.stringify({
            data,
            metadata,
            state: "submitted"
        }),
        headers: {
            'Content-Type': "application/json;charset=UTF-8",
            "x-jwt-token": localStorage.getItem("formioToken")
        },
        handleResponse: (res) => {
            CreateForm(res, response)
        }
    })
} */
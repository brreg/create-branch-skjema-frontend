let url: string
let backendWebsocketUrl: string
let backendUrl: string

if (import.meta.env.PROD) {
  url = "create-branch-java-backend.ashyflower-f0c84bfc.westeurope.azurecontainerapps.io"
  backendUrl = "https://" + url
  backendWebsocketUrl = "ws://" + url
} else {
  url = "localhost:8080"
  backendUrl = "http://" + url
  backendWebsocketUrl = "ws://" + url
}

export { backendUrl, backendWebsocketUrl }
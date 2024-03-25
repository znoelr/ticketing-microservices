### Kubernetes secrets

## Create secret
kubectl create secret generic jwt-secret --from-literal=<secret-name>=<secret_value>

## List secrets
kubectl get secrets

## Forward ports
kubectl get namespace
kubectl get pods -n <namespace>
kubectl port-forward -n <namespace> <pod-name> <local-port>:<remote-port>

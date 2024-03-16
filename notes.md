### Kubernetes secrets

## Create secret
kubectl create secret generic jwt-secret --from-literal=<secret-name>=<secret_value>

## List secrets
kubectl get secrets

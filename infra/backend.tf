terraform {
  # Bucket comes from the bootstrap output: terraform init -backend-config="bucket=<state_bucket>"
  backend "s3" {
    key          = "site/terraform.tfstate"
    encrypt      = true
    use_lockfile = true
  }
}

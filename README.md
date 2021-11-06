# `flake-dep-info-action`

Access the fields of `flake.lock` as `outputs` in a GitHub action step.

## Inputs

```yaml
inputs:
  input:
    required: true
    description: "The flake input whose data you want to access"
  lockfile:
    required: false
    description: "The path to the flake lock file containing locked dependencies"
    default: "flake.lock"
```

## Outputs

```yaml
outputs:
  owner:
    description: "The owner of the repository"
  repo:
    description: "The repository"
  rev:
    description: "Git revision of the dependency"
  short-rev:
    description: "Short git revision"
```

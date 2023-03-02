# Semver action

This action let you know where is your package.json file 

## Inputs

### location

**Required** The location of the package.json file in the repository. Default to git repository path

## Outputs

### time

The date and time the action was executed

# Example usage

```yaml
uses: trainingspaces/semver@v0.0.1
with:
    location: /package.json
```

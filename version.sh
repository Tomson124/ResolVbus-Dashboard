version_file=src/app/app.version.ts
> $version_file
echo "// This file was generated on $(date)
export const appVersion = '$npm_package_version';" >> $version_file